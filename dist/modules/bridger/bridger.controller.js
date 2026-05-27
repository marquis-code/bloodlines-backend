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
exports.BridgerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bridger_service_1 = require("./bridger.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const emergency_alert_dto_1 = require("./dtos/emergency-alert.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const role_enum_1 = require("../../common/enums/role.enum");
let BridgerController = class BridgerController {
    constructor(bridgerService) {
        this.bridgerService = bridgerService;
    }
    async getDashboardStats(user) {
        return this.bridgerService.getDashboardStats(user.userId);
    }
    async searchDonors(user, bloodType, state, paginationDto) {
        return this.bridgerService.searchDonors(user.userId, bloodType, state, (paginationDto === null || paginationDto === void 0 ? void 0 : paginationDto.page) || 1, (paginationDto === null || paginationDto === void 0 ? void 0 : paginationDto.limit) || 10);
    }
    async getAppointments(user, paginationDto) {
        return this.bridgerService.getAppointments(user.userId, paginationDto.page || 1, paginationDto.limit || 10);
    }
    async sendEmergencyAlert(user, dto) {
        return this.bridgerService.sendEmergencyAlert(user.userId, dto);
    }
};
exports.BridgerController = BridgerController;
__decorate([
    (0, common_1.Get)("dashboard/stats"),
    (0, swagger_1.ApiOperation)({ summary: "Get Bridger dashboard statistics" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BridgerController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)("donors"),
    (0, swagger_1.ApiOperation)({ summary: "Search for available donors" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("bloodType")),
    __param(2, (0, common_1.Query)("state")),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BridgerController.prototype, "searchDonors", null);
__decorate([
    (0, common_1.Get)("appointments"),
    (0, swagger_1.ApiOperation)({ summary: "Get facility appointments" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BridgerController.prototype, "getAppointments", null);
__decorate([
    (0, common_1.Post)("emergency-alert"),
    (0, swagger_1.ApiOperation)({ summary: "Send emergency push notification to donors" }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, emergency_alert_dto_1.EmergencyAlertDto]),
    __metadata("design:returntype", Promise)
], BridgerController.prototype, "sendEmergencyAlert", null);
exports.BridgerController = BridgerController = __decorate([
    (0, swagger_1.ApiTags)("Bridger"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("bridger"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.BRIDGER),
    __metadata("design:paramtypes", [bridger_service_1.BridgerService])
], BridgerController);
//# sourceMappingURL=bridger.controller.js.map