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
const notification_service_1 = require("../notification/notification.service");
let BloodRequestService = class BloodRequestService {
    constructor(bloodRequestModel, userModel, bloodRequestGateway, notificationService) {
        this.bloodRequestModel = bloodRequestModel;
        this.userModel = userModel;
        this.bloodRequestGateway = bloodRequestGateway;
        this.notificationService = notificationService;
    }
    async createBloodRequest(userId, createDto) {
        const user = await this.userModel.findById(userId);
        if (!user || user.role !== role_enum_1.UserRole.BRIDGER) {
            throw new common_1.ForbiddenException("Only Bridgers can create blood requests");
        }
        if (!user.geoLocation || !user.geoLocation.coordinates) {
            throw new common_1.BadRequestException("Please update your location before creating a blood request");
        }
        const bloodRequest = new this.bloodRequestModel(Object.assign(Object.assign({}, createDto), { createdBy: userId, status: request_status_enum_1.RequestStatus.PENDING, statusHistory: [{
                    status: request_status_enum_1.RequestStatus.PENDING,
                    timestamp: new Date(),
                    updatedBy: userId,
                    note: "Request created"
                }] }));
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
        try {
            const nearbyDonors = await this.bloodRequestGateway.findNearbyDonors(populatedRequest.bloodType, bridgerLocation, 50);
            const donorIds = nearbyDonors.map(d => d._id.toString());
            await this.notificationService.notifyNewBloodRequest(donorIds, {
                requestId: savedRequest._id,
                bloodType: populatedRequest.bloodType,
                unitsNeeded: populatedRequest.unitsNeeded,
                priorityLevel: populatedRequest.priorityLevel,
                facilityName: populatedRequest.createdBy.facilityName
            });
        }
        catch (error) {
            console.error("Failed to send blood request email notifications", error);
        }
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
        try {
            await this.notificationService.notifyDonorAcceptance(request.createdBy.toString(), {
                fullName: donor.fullName,
                bloodGroup: donor.bloodGroup,
                requestId: request._id
            });
        }
        catch (error) {
            console.error("Failed to send donor acceptance email notification", error);
        }
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
            if (!request.statusHistory)
                request.statusHistory = [];
            request.statusHistory.push({
                status: request_status_enum_1.RequestStatus.FULFILLED,
                timestamp: new Date(),
                updatedBy: donorId,
                note: "Units confirmed by donor"
            });
            await request.save();
            await this.bloodRequestGateway.notifyRequestFulfilled(requestId);
            try {
                const donorIds = request.assignedDonors.map(id => id.toString());
                await this.notificationService.notifyRequestFulfilled(donorIds, requestId);
            }
            catch (error) {
                console.error("Failed to send request fulfillment email notifications", error);
            }
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
        const donor = await this.userModel.findById(donorId);
        if (!donor) {
            throw new common_1.NotFoundException("Donor not found");
        }
        await this.bloodRequestGateway.notifyDonorArrival(requestId, donorId);
        try {
            await this.notificationService.notifyDonorArrival(request.createdBy.toString(), {
                fullName: donor.fullName,
                bloodGroup: donor.bloodGroup,
                requestId: request._id
            });
        }
        catch (error) {
            console.error("Failed to send donor arrival email notification", error);
        }
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
        if (updateDto.status && updateDto.status !== request.status) {
            if (!request.statusHistory)
                request.statusHistory = [];
            request.statusHistory.push({
                status: updateDto.status,
                timestamp: new Date(),
                updatedBy: userId,
                note: "Status updated manually"
            });
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
        if (!request.statusHistory)
            request.statusHistory = [];
        request.statusHistory.push({
            status: request_status_enum_1.RequestStatus.CANCELLED,
            timestamp: new Date(),
            updatedBy: userId,
            note: "Request cancelled by user"
        });
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
        blood_request_gateway_1.BloodRequestGateway,
        notification_service_1.NotificationService])
], BloodRequestService);
//# sourceMappingURL=blood-request.service.js.map