"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloodRequestService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const blood_request_schema_1 = require("./schema/blood-request.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const role_enum_1 = require("../../common/enums/role.enum");
const request_status_enum_1 = require("../../common/enums/request-status.enum");
const donor_response_enum_1 = require("../../common/enums/donor-response.enum");
const blood_request_gateway_1 = require("./blood-request.gateway");
let BloodRequestService = class BloodRequestService {
    constructor(bloodRequestModel, userModel, bloodRequestGateway) {
        this.bloodRequestModel = bloodRequestModel;
        this.userModel = userModel;
        this.bloodRequestGateway = bloodRequestGateway;
    }
    async createBloodRequest(userId, createDto) {
        const user = await this.userModel.findById(userId);
        if (!user || user.role !== role_enum_1.UserRole.BRIDGER) {
            throw new common_1.ForbiddenException("Only Bridgers can create blood requests");
        }
        if (!user.geoLocation || !user.geoLocation.coordinates) {
            throw new common_1.BadRequestException("Please update your location before creating a blood request");
        }
        const bloodRequest = new this.bloodRequestModel(Object.assign(Object.assign({}, createDto), { createdBy: userId, status: request_status_enum_1.RequestStatus.PENDING }));
        const savedRequest = await bloodRequest.save();
        const populatedRequest = await this.bloodRequestModel
            .findById(savedRequest._id)
            .populate("createdBy", "fullName email facilityName");
        if (!populatedRequest) {
            throw new common_1.NotFoundException("Failed to retrieve created request");
        }
        const bridgerLocation = {
            lat: user.geoLocation.coordinates[1],
            lng: user.geoLocation.coordinates[0],
        };
        await this.bloodRequestGateway.notifyNearbyDonors(populatedRequest, bridgerLocation);
        return savedRequest;
    }
    async getActiveRequests(limit = 10, skip = 0) {
        return this.bloodRequestModel
            .find({ status: { $ne: request_status_enum_1.RequestStatus.FULFILLED } })
            .populate("createdBy", "fullName email facilityName")
            .populate("assignedDonors", "fullName bloodGroup phoneNumber")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
    }
    async getRequestsByUser(userId, limit = 10, skip = 0) {
        return this.bloodRequestModel
            .find({ createdBy: userId })
            .populate("assignedDonors", "fullName bloodGroup phoneNumber")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
    }
    async getRequestsForDonor(donorId, limit = 10, skip = 0) {
        const donor = await this.userModel.findById(donorId);
        if (!donor || donor.role !== role_enum_1.UserRole.DONOR) {
            throw new common_1.ForbiddenException("Only donors can view donor-specific requests");
        }
        return this.bloodRequestModel
            .find({
            bloodType: donor.bloodGroup,
            status: { $nin: [request_status_enum_1.RequestStatus.FULFILLED, request_status_enum_1.RequestStatus.CANCELLED] },
        })
            .populate("createdBy", "fullName facilityName contactPhone")
            .sort({ priorityLevel: 1, createdAt: -1 })
            .limit(limit)
            .skip(skip);
    }
    async acceptBloodRequest(requestId, donorId) {
        var _a;
        const donor = await this.userModel.findById(donorId);
        if (!donor || donor.role !== role_enum_1.UserRole.DONOR) {
            throw new common_1.ForbiddenException("Only donors can accept blood requests");
        }
        const request = await this.bloodRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        if (request.status === request_status_enum_1.RequestStatus.FULFILLED) {
            throw new common_1.BadRequestException("This request has already been fulfilled");
        }
        if (request.bloodType !== donor.bloodGroup) {
            throw new common_1.BadRequestException("Blood group mismatch");
        }
        if ((_a = request.assignedDonors) === null || _a === void 0 ? void 0 : _a.some(id => id.toString() === donorId)) {
            throw new common_1.BadRequestException("You have already accepted this request");
        }
        if (!request.assignedDonors) {
            request.assignedDonors = [];
        }
        request.assignedDonors.push(donor._id);
        request.donorResponseStatus = donor_response_enum_1.DonorResponse.ACCEPTED;
        await request.save();
        await this.bloodRequestGateway.notifyDonorAcceptance(requestId, donorId);
        await this.bloodRequestGateway.broadcastRequestUpdate(requestId);
        return request;
    }
    async confirmDonation(requestId, donorId) {
        var _a;
        const request = await this.bloodRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        const donor = await this.userModel.findById(donorId);
        if (!donor) {
            throw new common_1.NotFoundException("Donor not found");
        }
        if (!((_a = request.assignedDonors) === null || _a === void 0 ? void 0 : _a.some(id => id.toString() === donorId))) {
            throw new common_1.ForbiddenException("You are not assigned to this request");
        }
        request.unitsConfirmed += 1;
        donor.donationCount += 1;
        donor.lastDonationDate = new Date();
        const nextEligible = new Date();
        nextEligible.setDate(nextEligible.getDate() + 56);
        donor.nextEligibleDate = nextEligible;
        await donor.save();
        if (request.unitsConfirmed >= request.unitsNeeded) {
            request.status = request_status_enum_1.RequestStatus.FULFILLED;
            request.fulfillmentDate = new Date();
            await request.save();
            await this.bloodRequestGateway.notifyRequestFulfilled(requestId);
        }
        else {
            await request.save();
            await this.bloodRequestGateway.broadcastRequestUpdate(requestId);
        }
        return request;
    }
    async notifyDonorArrival(requestId, donorId) {
        var _a;
        const request = await this.bloodRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        if (!((_a = request.assignedDonors) === null || _a === void 0 ? void 0 : _a.some(id => id.toString() === donorId))) {
            throw new common_1.ForbiddenException("You are not assigned to this request");
        }
        await this.bloodRequestGateway.notifyDonorArrival(requestId, donorId);
        return { message: "Arrival notification sent" };
    }
    async escalateRequest(requestId, userId) {
        var _a;
        const request = await this.bloodRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        if (request.createdBy.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only escalate your own requests");
        }
        request.unitsEscalated += 1;
        request.donorResponseStatus = donor_response_enum_1.DonorResponse.ESCALATED;
        await request.save();
        const bridger = await this.userModel.findById(userId);
        if (bridger && ((_a = bridger.geoLocation) === null || _a === void 0 ? void 0 : _a.coordinates)) {
            const bridgerLocation = {
                lat: bridger.geoLocation.coordinates[1],
                lng: bridger.geoLocation.coordinates[0],
            };
            const populatedRequest = await this.bloodRequestModel
                .findById(requestId)
                .populate("createdBy", "fullName email facilityName");
            if (populatedRequest) {
                await this.bloodRequestGateway.notifyNearbyDonors(populatedRequest, bridgerLocation);
            }
        }
        return request;
    }
    async updateRequest(requestId, userId, updateDto) {
        const request = await this.bloodRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        if (request.createdBy.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only update your own requests");
        }
        if (request.status === request_status_enum_1.RequestStatus.FULFILLED) {
            throw new common_1.BadRequestException("Cannot update fulfilled requests");
        }
        Object.assign(request, updateDto);
        await request.save();
        await this.bloodRequestGateway.broadcastRequestUpdate(requestId);
        return request;
    }
    async cancelRequest(requestId, userId) {
        const request = await this.bloodRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        if (request.createdBy.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only cancel your own requests");
        }
        request.status = request_status_enum_1.RequestStatus.CANCELLED;
        await request.save();
        await this.bloodRequestGateway.broadcastRequestUpdate(requestId);
        return request;
    }
    async getAllRequests(limit = 10, skip = 0) {
        return this.bloodRequestModel
            .find()
            .populate("createdBy", "fullName email facilityName")
            .populate("assignedDonors", "fullName bloodGroup phoneNumber")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
    }
    async getRequestById(requestId) {
        const request = await this.bloodRequestModel
            .findById(requestId)
            .populate("createdBy", "fullName email facilityName contactPhone")
            .populate("assignedDonors", "fullName bloodGroup phoneNumber email");
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        return request;
    }
};
exports.BloodRequestService = BloodRequestService;
exports.BloodRequestService = BloodRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(blood_request_schema_1.BloodRequest.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        blood_request_gateway_1.BloodRequestGateway])
], BloodRequestService);
//# sourceMappingURL=blood-request.service.js.map