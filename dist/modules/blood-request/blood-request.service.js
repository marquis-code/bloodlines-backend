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
let BloodRequestService = class BloodRequestService {
    constructor(bloodRequestModel, userModel) {
        this.bloodRequestModel = bloodRequestModel;
        this.userModel = userModel;
    }
    async createBloodRequest(userId, createDto) {
        const user = await this.userModel.findById(userId);
        if (!user || user.role !== role_enum_1.UserRole.BRIDGER) {
            throw new common_1.ForbiddenException("Only Bridgers can create blood requests");
        }
        const bloodRequest = new this.bloodRequestModel(Object.assign(Object.assign({}, createDto), { createdBy: userId }));
        return bloodRequest.save();
    }
    async getActiveRequests(limit = 10, skip = 0) {
        return this.bloodRequestModel
            .find({ status: { $ne: request_status_enum_1.RequestStatus.FULFILLED } })
            .populate("createdBy", "fullName email facilityName")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
    }
    async getRequestsByUser(userId, limit = 10, skip = 0) {
        return this.bloodRequestModel.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(limit).skip(skip);
    }
    async confirmDonation(requestId, userId) {
        const request = await this.bloodRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        request.unitsConfirmed += 1;
        if (request.unitsConfirmed >= request.unitsNeeded) {
            request.status = request_status_enum_1.RequestStatus.FULFILLED;
            request.fulfillmentDate = new Date();
        }
        return request.save();
    }
    async updateRequest(requestId, userId, updateDto) {
        const request = await this.bloodRequestModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        if (request.createdBy.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only update your own requests");
        }
        Object.assign(request, updateDto);
        return request.save();
    }
    async getAllRequests(limit = 10, skip = 0) {
        return this.bloodRequestModel
            .find()
            .populate("createdBy", "fullName email facilityName")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
    }
};
exports.BloodRequestService = BloodRequestService;
exports.BloodRequestService = BloodRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(blood_request_schema_1.BloodRequest.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], BloodRequestService);
//# sourceMappingURL=blood-request.service.js.map