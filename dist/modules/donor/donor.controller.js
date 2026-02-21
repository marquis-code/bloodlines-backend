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
exports.DonorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const donor_service_1 = require("./donor.service");
const accept_request_dto_1 = require("./dto/accept-request.dto");
const reject_request_dto_1 = require("./dto/reject-request.dto");
const submit_feedback_dto_1 = require("./dto/submit-feedback.dto");
const update_progress_dto_1 = require("./dto/update-progress.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const update_availability_dto_1 = require("./dto/update-availability.dto");
const update_notification_preferences_dto_1 = require("./dto/update-notification-preferences.dto");
const resource_type_1 = require("./types/resource.type");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const notification_gateway_1 = require("../notification/notification.gateway");
let DonorController = class DonorController {
    constructor(donorService, notificationGateway) {
        this.donorService = donorService;
        this.notificationGateway = notificationGateway;
    }
    async getDonorDashboard(user) {
        return this.donorService.getDonorDashboard(user.userId);
    }
    async getDonorProfile(user) {
        return this.donorService.getDonorProfile(user.userId);
    }
    async getNearbyBloodRequests(user, radiusKm) {
        return this.donorService.getNearbyBloodRequests(user.userId, radiusKm ? Number(radiusKm) : 50);
    }
    async getBloodRequestDetails(requestId) {
        return this.donorService.getBloodRequestDetails(requestId);
    }
    async getResources(category, searchQuery) {
        return this.donorService.getResources(category || resource_type_1.ResourceCategoryEnum.ALL, searchQuery);
    }
    async getDonationHistory(user, limit) {
        return this.donorService.getDonationHistory(user.userId, limit ? Number(limit) : 10);
    }
    async getNotificationPreferences(user) {
        return this.donorService.getNotificationPreferences(user.userId);
    }
    async getMedicalEligibility(user) {
        return this.donorService.getMedicalEligibility(user.userId);
    }
    async updateProfile(user, input) {
        return this.donorService.updateProfile(user.userId, input);
    }
    async updateAvailability(user, input) {
        return this.donorService.updateAvailability(user.userId, input);
    }
    async updateNotificationPreferences(user, input) {
        return this.donorService.updateNotificationPreferences(user.userId, input);
    }
    async acceptBloodRequest(user, input) {
        const result = await this.donorService.acceptBloodRequest(user.userId, input);
        this.notificationGateway.broadcastDonationAccepted(result);
        return result;
    }
    async rejectBloodRequest(user, input) {
        await this.donorService.rejectBloodRequest(user.userId, input);
        return true;
    }
    async updateDonationProgress(user, input) {
        const result = await this.donorService.updateDonationProgress(user.userId, input);
        this.notificationGateway.broadcastProgressUpdate(result);
        return result;
    }
    async submitDonationFeedback(user, input) {
        return this.donorService.submitFeedback(user.userId, input);
    }
};
exports.DonorController = DonorController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("dashboard"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonorDashboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("profile"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonorProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("nearby-requests"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("radiusKm")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getNearbyBloodRequests", null);
__decorate([
    (0, common_1.Get)("blood-request/:requestId"),
    __param(0, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getBloodRequestDetails", null);
__decorate([
    (0, common_1.Get)("resources"),
    __param(0, (0, common_1.Query)("category")),
    __param(1, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getResources", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("history"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonationHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("notification-preferences"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getNotificationPreferences", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("medical-eligibility"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getMedicalEligibility", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("profile"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("availability"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_availability_dto_1.UpdateAvailabilityInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateAvailability", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("notification-preferences"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_notification_preferences_dto_1.UpdateNotificationPreferencesInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateNotificationPreferences", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("accept-request"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, accept_request_dto_1.AcceptRequestInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "acceptBloodRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("reject-request"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reject_request_dto_1.RejectRequestInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "rejectBloodRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("update-progress"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_progress_dto_1.UpdateProgressInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateDonationProgress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("feedback"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, submit_feedback_dto_1.SubmitFeedbackInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "submitDonationFeedback", null);
exports.DonorController = DonorController = __decorate([
    (0, swagger_1.ApiTags)("Donor"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("donor"),
    __metadata("design:paramtypes", [donor_service_1.DonorService,
        notification_gateway_1.NotificationGateway])
], DonorController);
//# sourceMappingURL=donor.controller.js.map