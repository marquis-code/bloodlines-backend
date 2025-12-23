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
exports.RoleUpgradeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const request_role_upgrade_schema_1 = require("./schemas/request-role-upgrade.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const role_enum_1 = require("../../common/enums/role.enum");
let RoleUpgradeService = class RoleUpgradeService {
    constructor(roleUpgradeModel, userModel) {
        this.roleUpgradeModel = roleUpgradeModel;
        this.userModel = userModel;
    }
    async requestRoleUpgrade(userId, requestDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (user.role === requestDto.requestedRole) {
            throw new common_1.BadRequestException("You already have this role");
        }
        const pendingRequest = await this.roleUpgradeModel.findOne({
            userId,
            status: "PENDING",
        });
        if (pendingRequest) {
            throw new common_1.BadRequestException("You already have a pending role upgrade request");
        }
        if (requestDto.requestedRole === role_enum_1.UserRole.BRIDGER && user.donationCount < 1) {
            throw new common_1.BadRequestException("You need at least 1 successful donation to become a Bridger");
        }
        if (requestDto.requestedRole === role_enum_1.UserRole.PULSE_LEADER && user.donationCount < 5) {
            throw new common_1.BadRequestException("You need at least 5 successful donations to become a Pulse Leader");
        }
        const roleUpgradeRequest = new this.roleUpgradeModel(Object.assign({ userId }, requestDto));
        return roleUpgradeRequest.save();
    }
    async getPendingRequests(limit = 10, skip = 0) {
        return this.roleUpgradeModel
            .find({ status: "PENDING" })
            .populate("userId", "fullName email donationCount facilityName")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
    }
    async approveUpgrade(requestId, adminId) {
        const request = await this.roleUpgradeModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Upgrade request not found");
        }
        const user = await this.userModel.findById(request.userId);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        user.role = request.requestedRole;
        user.facilityName = request.facilityName;
        user.facilityAddress = request.facilityAddress;
        await user.save();
        request.status = "APPROVED";
        request.reviewedBy = adminId;
        request.reviewDate = new Date();
        await request.save();
        return { message: "Role upgrade approved successfully" };
    }
    async rejectUpgrade(requestId, adminId, rejectionReason) {
        const request = await this.roleUpgradeModel.findById(requestId);
        if (!request) {
            throw new common_1.NotFoundException("Upgrade request not found");
        }
        request.status = "REJECTED";
        request.reviewedBy = adminId;
        request.reviewDate = new Date();
        request.rejectionReason = rejectionReason;
        await request.save();
        return { message: "Role upgrade rejected successfully" };
    }
    async getUserUpgradeHistory(userId) {
        return this.roleUpgradeModel.find({ userId }).sort({ createdAt: -1 });
    }
};
exports.RoleUpgradeService = RoleUpgradeService;
exports.RoleUpgradeService = RoleUpgradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(request_role_upgrade_schema_1.RoleUpgradeRequest.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], RoleUpgradeService);
//# sourceMappingURL=role-upgrade.service.js.map