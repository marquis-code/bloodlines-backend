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
exports.PulseLeaderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const pulse_leader_service_1 = require("./pulse-leader.service");
const search_donors_dto_1 = require("./dto/search-donors.dto");
const broadcast_message_dto_1 = require("./dto/broadcast-message.dto");
let PulseLeaderController = class PulseLeaderController {
    constructor(pulseLeaderService) {
        this.pulseLeaderService = pulseLeaderService;
    }
    async getPulseLeaderDashboard(user) {
        return this.pulseLeaderService.getPulseLeaderDashboard(user.userId);
    }
    async searchDonors(filters, user) {
        return this.pulseLeaderService.searchDonors(filters, user.userId);
    }
    async getEscalationHistory(limit = 5, user) {
        return this.pulseLeaderService.getEscalationHistory(user.userId, Number(limit));
    }
    async broadcastMessage(broadcastDto, user) {
        return this.pulseLeaderService.broadcastMessage(broadcastDto, user.userId);
    }
    async getRecentActivities(limit = 10, user) {
        return this.pulseLeaderService.getRecentActivities(user.userId, Number(limit));
    }
};
exports.PulseLeaderController = PulseLeaderController;
__decorate([
    (0, common_1.Get)("dashboard"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderController.prototype, "getPulseLeaderDashboard", null);
__decorate([
    (0, common_1.Post)("search-donors"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_donors_dto_1.SearchDonorsFilterDto, Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderController.prototype, "searchDonors", null);
__decorate([
    (0, common_1.Get)("escalation-history"),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderController.prototype, "getEscalationHistory", null);
__decorate([
    (0, common_1.Post)("broadcast"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [broadcast_message_dto_1.BroadcastMessageDto, Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderController.prototype, "broadcastMessage", null);
__decorate([
    (0, common_1.Get)("recent-activities"),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderController.prototype, "getRecentActivities", null);
exports.PulseLeaderController = PulseLeaderController = __decorate([
    (0, swagger_1.ApiTags)("Pulse Leader"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("pulse-leader"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pulse_leader_service_1.PulseLeaderService])
], PulseLeaderController);
//# sourceMappingURL=pulse-leader.controller.js.map