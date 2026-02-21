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
exports.RoleUpgradeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_upgrade_service_1 = require("./role-upgrade.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let RoleUpgradeController = class RoleUpgradeController {
    constructor(roleUpgradeService) {
        this.roleUpgradeService = roleUpgradeService;
    }
    async requestRoleUpgrade(body, user) {
        return this.roleUpgradeService.requestRoleUpgrade(user.userId, body);
    }
    async getPendingUpgradeRequests(limit = 10, skip = 0) {
        return this.roleUpgradeService.getPendingRequests(Number(limit), Number(skip));
    }
    async approveRoleUpgrade(requestId, user) {
        await this.roleUpgradeService.approveUpgrade(requestId, user.userId);
        return { message: "Role upgrade approved successfully" };
    }
    async rejectRoleUpgrade(requestId, rejectionReason, user) {
        await this.roleUpgradeService.rejectUpgrade(requestId, user.userId, rejectionReason);
        return { message: "Role upgrade rejected successfully" };
    }
    async getMyUpgradeHistory(user) {
        return this.roleUpgradeService.getUserUpgradeHistory(user.userId);
    }
};
exports.RoleUpgradeController = RoleUpgradeController;
__decorate([
    (0, common_1.Post)("request"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeController.prototype, "requestRoleUpgrade", null);
__decorate([
    (0, common_1.Get)("pending"),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeController.prototype, "getPendingUpgradeRequests", null);
__decorate([
    (0, common_1.Post)(":requestId/approve"),
    __param(0, (0, common_1.Param)("requestId")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeController.prototype, "approveRoleUpgrade", null);
__decorate([
    (0, common_1.Post)(":requestId/reject"),
    __param(0, (0, common_1.Param)("requestId")),
    __param(1, (0, common_1.Body)("rejectionReason")),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeController.prototype, "rejectRoleUpgrade", null);
__decorate([
    (0, common_1.Get)("my-history"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeController.prototype, "getMyUpgradeHistory", null);
exports.RoleUpgradeController = RoleUpgradeController = __decorate([
    (0, swagger_1.ApiTags)("Role Upgrades"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("role-upgrades"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [role_upgrade_service_1.RoleUpgradeService])
], RoleUpgradeController);
//# sourceMappingURL=role-upgrade.controller.js.map