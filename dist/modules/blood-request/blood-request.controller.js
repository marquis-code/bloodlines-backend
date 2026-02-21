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
exports.BloodRequestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blood_request_service_1 = require("./blood-request.service");
const create_blood_request_dto_1 = require("./dtos/create-blood-request.dto");
const update_blood_request_dto_1 = require("./dtos/update-blood-request.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let BloodRequestController = class BloodRequestController {
    constructor(bloodRequestService) {
        this.bloodRequestService = bloodRequestService;
    }
    async createBloodRequest(user, createDto) {
        return this.bloodRequestService.createBloodRequest(user.userId, createDto);
    }
    async getActiveRequests(limit = 10, skip = 0) {
        return this.bloodRequestService.getActiveRequests(Number(limit), Number(skip));
    }
    async getAllRequests(limit = 10, skip = 0) {
        return this.bloodRequestService.getAllRequests(Number(limit), Number(skip));
    }
    async getMyRequests(user, limit = 10, skip = 0) {
        return this.bloodRequestService.getRequestsByUser(user.userId, Number(limit), Number(skip));
    }
    async getRequestsForDonor(user, limit = 10, skip = 0) {
        return this.bloodRequestService.getRequestsForDonor(user.userId, Number(limit), Number(skip));
    }
    async getRequestById(requestId) {
        return this.bloodRequestService.getRequestById(requestId);
    }
    async acceptBloodRequest(user, requestId) {
        return this.bloodRequestService.acceptBloodRequest(requestId, user.userId);
    }
    async confirmDonation(user, requestId) {
        return this.bloodRequestService.confirmDonation(requestId, user.userId);
    }
    async notifyDonorArrival(user, requestId) {
        return this.bloodRequestService.notifyDonorArrival(requestId, user.userId);
    }
    async escalateRequest(user, requestId) {
        return this.bloodRequestService.escalateRequest(requestId, user.userId);
    }
    async updateBloodRequest(user, requestId, updateDto) {
        return this.bloodRequestService.updateRequest(requestId, user.userId, updateDto);
    }
    async cancelBloodRequest(user, requestId) {
        return this.bloodRequestService.cancelRequest(requestId, user.userId);
    }
};
exports.BloodRequestController = BloodRequestController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_blood_request_dto_1.CreateBloodRequestDto]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "createBloodRequest", null);
__decorate([
    (0, common_1.Get)("active"),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "getActiveRequests", null);
__decorate([
    (0, common_1.Get)("all"),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "getAllRequests", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("my"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "getMyRequests", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("donor"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "getRequestsForDonor", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(":requestId"),
    __param(0, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "getRequestById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(":requestId/accept"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "acceptBloodRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(":requestId/confirm"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "confirmDonation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(":requestId/arrival-alert"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "notifyDonorArrival", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(":requestId/escalate"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "escalateRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(":requestId/update"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("requestId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_blood_request_dto_1.UpdateBloodRequestDto]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "updateBloodRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(":requestId/cancel"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BloodRequestController.prototype, "cancelBloodRequest", null);
exports.BloodRequestController = BloodRequestController = __decorate([
    (0, swagger_1.ApiTags)("Blood Requests"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("blood-requests"),
    __metadata("design:paramtypes", [blood_request_service_1.BloodRequestService])
], BloodRequestController);
//# sourceMappingURL=blood-request.controller.js.map