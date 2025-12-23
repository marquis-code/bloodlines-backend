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
exports.RoleUpgradeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const role_upgrade_service_1 = require("./role-upgrade.service");
const role_upgrade_type_1 = require("./types/role-upgrade.type");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const role_enum_1 = require("../../common/enums/role.enum");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let RoleUpgradeResolver = class RoleUpgradeResolver {
    constructor(roleUpgradeService) {
        this.roleUpgradeService = roleUpgradeService;
    }
    async requestRoleUpgrade(requestedRole, facilityName, facilityAddress, reason, user) {
        return this.roleUpgradeService.requestRoleUpgrade(user.sub, {
            requestedRole,
            facilityName,
            facilityAddress,
            reason,
        });
    }
    async getPendingUpgradeRequests(limit, skip) {
        return this.roleUpgradeService.getPendingRequests(limit, skip);
    }
    async approveRoleUpgrade(requestId, user) {
        await this.roleUpgradeService.approveUpgrade(requestId, user.sub);
        return "Role upgrade approved successfully";
    }
    async rejectRoleUpgrade(requestId, rejectionReason, user) {
        await this.roleUpgradeService.rejectUpgrade(requestId, user.sub, rejectionReason);
        return "Role upgrade rejected successfully";
    }
    async getMyUpgradeHistory(user) {
        return this.roleUpgradeService.getUserUpgradeHistory(user.sub);
    }
};
exports.RoleUpgradeResolver = RoleUpgradeResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => role_upgrade_type_1.RoleUpgradeRequestType),
    __param(0, (0, graphql_1.Args)("requestedRole", { type: () => String })),
    __param(1, (0, graphql_1.Args)("facilityName")),
    __param(2, (0, graphql_1.Args)("facilityAddress")),
    __param(3, (0, graphql_1.Args)("reason")),
    __param(4, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeResolver.prototype, "requestRoleUpgrade", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [role_upgrade_type_1.RoleUpgradeRequestType]),
    __param(0, (0, graphql_1.Args)("limit", { type: () => Number, defaultValue: 10 })),
    __param(1, (0, graphql_1.Args)("skip", { type: () => Number, defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RoleUpgradeResolver.prototype, "getPendingUpgradeRequests", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("requestId")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeResolver.prototype, "approveRoleUpgrade", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("requestId")),
    __param(1, (0, graphql_1.Args)("rejectionReason")),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeResolver.prototype, "rejectRoleUpgrade", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [role_upgrade_type_1.RoleUpgradeRequestType]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleUpgradeResolver.prototype, "getMyUpgradeHistory", null);
exports.RoleUpgradeResolver = RoleUpgradeResolver = __decorate([
    (0, graphql_1.Resolver)(() => role_upgrade_type_1.RoleUpgradeRequestType),
    __metadata("design:paramtypes", [role_upgrade_service_1.RoleUpgradeService])
], RoleUpgradeResolver);
//# sourceMappingURL=role-upgrade.resolver.js.map