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
const openapi = require("@nestjs/swagger");
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
const set_goal_dto_1 = require("./dto/set-goal.dto");
const submit_health_screening_dto_1 = require("./dto/submit-health-screening.dto");
const resource_type_1 = require("./types/resource.type");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
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
    async getDonorDashboardSummary(user) {
        return this.donorService.getDonorDashboardSummary(user.userId);
    }
    async getDonorStats(user) {
        return this.donorService.getDonorStats(user.userId);
    }
    async getDonorProfileCompletion(user) {
        return this.donorService.getDonorProfileCompletion(user.userId);
    }
    async getDonorProfile(user) {
        return this.donorService.getDonorProfile(user.userId);
    }
    async getNearbyBloodRequests(user, radiusKm, paginationDto) {
        return this.donorService.getNearbyBloodRequests(user.userId, radiusKm ? Number(radiusKm) : 50, paginationDto === null || paginationDto === void 0 ? void 0 : paginationDto.page, paginationDto === null || paginationDto === void 0 ? void 0 : paginationDto.limit);
    }
    async getBloodRequestDetails(requestId) {
        return this.donorService.getBloodRequestDetails(requestId);
    }
    async getResources(category, searchQuery) {
        return this.donorService.getResources(category || resource_type_1.ResourceCategoryEnum.ALL, searchQuery);
    }
    async getDonationHistory(user, paginationDto, status) {
        return this.donorService.getDonationHistoryPaginated(user.userId, paginationDto.page || 1, paginationDto.limit || 10, status);
    }
    async getDonationRecord(user, donationId) {
        return this.donorService.getDonationRecord(user.userId, donationId);
    }
    async getDonationCertificate(user, donationId) {
        return this.donorService.getDonationCertificate(user.userId, donationId);
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
    async getRequestProgress(user, requestId) {
        return this.donorService.getDonationRecord(user.userId, requestId);
    }
    async getBadges(user) {
        return this.donorService.getBadges(user.userId);
    }
    async getLeaderboard(limit, region) {
        return this.donorService.getLeaderboard(limit ? Number(limit) : 10, region);
    }
    async toggleAnonymity(user, anonymous) {
        return this.donorService.toggleAnonymity(user.userId, anonymous);
    }
    async getHealthScreeningQuestions() {
        return this.donorService.getHealthScreeningQuestions();
    }
    async submitHealthScreening(user, dto) {
        return this.donorService.submitHealthScreening(user.userId, dto.answers);
    }
    async getGoal(user, year) {
        return this.donorService.getGoal(user.userId, year ? Number(year) : new Date().getFullYear());
    }
    async setGoal(user, dto) {
        return this.donorService.setGoal(user.userId, dto.target, dto.year);
    }
    async getShareableImpact(user) {
        return this.donorService.getShareableImpact(user.userId);
    }
    async getActivityFeed(paginationDto) {
        return this.donorService.getCommunityActivityFeed(paginationDto.page || 1, paginationDto.limit || 10);
    }
    async submitDonationFeedback(user, input) {
        return this.donorService.submitFeedback(user.userId, input);
    }
};
exports.DonorController = DonorController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("dashboard"),
    openapi.ApiResponse({ status: 200, type: require("./types/donor-profile.type").DonorDashboard }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonorDashboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("dashboard/summary"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonorDashboardSummary", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("stats"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonorStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("profile/completion"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonorProfileCompletion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("profile"),
    openapi.ApiResponse({ status: 200, type: require("./types/donor-profile.type").DonorProfile }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonorProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("nearby-requests"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("radiusKm")),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getNearbyBloodRequests", null);
__decorate([
    (0, common_1.Get)("blood-request/:requestId"),
    openapi.ApiResponse({ status: 200, type: require("./types/donation-request.type").DonationRequest }),
    __param(0, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getBloodRequestDetails", null);
__decorate([
    (0, common_1.Get)("resources"),
    openapi.ApiResponse({ status: 200, type: require("./types/resource.type").ResourcesPage }),
    __param(0, (0, common_1.Query)("category")),
    __param(1, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getResources", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("history"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonationHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("history/:donationId"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("donationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonationRecord", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("certificate/:donationId"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("donationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getDonationCertificate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("notification-preferences"),
    openapi.ApiResponse({ status: 200, type: require("./types/donor-profile.type").NotificationPreference }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getNotificationPreferences", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("medical-eligibility"),
    openapi.ApiResponse({ status: 200, type: require("./types/donor-profile.type").MedicalEligibility }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getMedicalEligibility", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("profile"),
    openapi.ApiResponse({ status: 201, type: require("./types/donor-profile.type").DonorProfile }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("availability"),
    openapi.ApiResponse({ status: 201, type: require("./types/donor-profile.type").DonorProfile }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_availability_dto_1.UpdateAvailabilityInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateAvailability", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("notification-preferences"),
    openapi.ApiResponse({ status: 201, type: require("./types/donor-profile.type").NotificationPreference }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_notification_preferences_dto_1.UpdateNotificationPreferencesInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateNotificationPreferences", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("accept-request"),
    openapi.ApiResponse({ status: 201, type: require("./types/donation-request.type").DonationProgressUpdate }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, accept_request_dto_1.AcceptRequestInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "acceptBloodRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("reject-request"),
    openapi.ApiResponse({ status: 201, type: Boolean }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reject_request_dto_1.RejectRequestInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "rejectBloodRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("update-progress"),
    openapi.ApiResponse({ status: 201, type: require("./types/donation-request.type").DonationProgressUpdate }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_progress_dto_1.UpdateProgressInput]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "updateDonationProgress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("request-progress/:requestId"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getRequestProgress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("badges"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getBadges", null);
__decorate([
    (0, common_1.Get)("leaderboard"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("region")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)("settings/anonymity"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)("anonymous")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "toggleAnonymity", null);
__decorate([
    (0, common_1.Get)("health-screening/questions"),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getHealthScreeningQuestions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("health-screening/submit"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, submit_health_screening_dto_1.SubmitHealthScreeningDto]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "submitHealthScreening", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("goal"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("year")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getGoal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("goal"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, set_goal_dto_1.SetGoalDto]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "setGoal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("shareable-impact"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getShareableImpact", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("activity-feed"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], DonorController.prototype, "getActivityFeed", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("feedback"),
    openapi.ApiResponse({ status: 201, type: require("./types/feedback.type").DonationFeedback }),
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