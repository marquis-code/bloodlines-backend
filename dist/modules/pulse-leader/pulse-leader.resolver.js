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
exports.PulseLeaderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const pulse_leader_service_1 = require("./pulse-leader.service");
const pulse_leader_type_1 = require("./types/pulse-leader.type");
const search_donors_dto_1 = require("./dto/search-donors.dto");
const broadcast_message_dto_1 = require("./dto/broadcast-message.dto");
let PulseLeaderResolver = class PulseLeaderResolver {
    constructor(pulseLeaderService) {
        this.pulseLeaderService = pulseLeaderService;
    }
    async getPulseLeaderDashboard(user) {
        return this.pulseLeaderService.getPulseLeaderDashboard(user.userId);
    }
    async searchDonors(filters, user) {
        return this.pulseLeaderService.searchDonors(filters, user.userId);
    }
    async getEscalationHistory(limit, user) {
        return this.pulseLeaderService.getEscalationHistory(user.userId, limit);
    }
    async broadcastMessage(broadcastDto, user) {
        return this.pulseLeaderService.broadcastMessage(broadcastDto, user.userId);
    }
    async getRecentActivities(limit, user) {
        return this.pulseLeaderService.getRecentActivities(user.userId, limit);
    }
};
exports.PulseLeaderResolver = PulseLeaderResolver;
__decorate([
    (0, graphql_1.Query)(() => pulse_leader_type_1.PulseLeaderDashboardType),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderResolver.prototype, "getPulseLeaderDashboard", null);
__decorate([
    (0, graphql_1.Query)(() => [pulse_leader_type_1.DonorSearchResultType]),
    __param(0, (0, graphql_1.Args)("filters")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_donors_dto_1.SearchDonorsFilterDto, Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderResolver.prototype, "searchDonors", null);
__decorate([
    (0, graphql_1.Query)(() => [pulse_leader_type_1.EscalationHistoryType]),
    __param(0, (0, graphql_1.Args)("limit", { type: () => Number, nullable: true, defaultValue: 5 })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderResolver.prototype, "getEscalationHistory", null);
__decorate([
    (0, graphql_1.Mutation)(() => pulse_leader_type_1.BroadcastMessageType),
    __param(0, (0, graphql_1.Args)("input")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [broadcast_message_dto_1.BroadcastMessageDto, Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderResolver.prototype, "broadcastMessage", null);
__decorate([
    (0, graphql_1.Query)(() => [pulse_leader_type_1.RecentActivityType]),
    __param(0, (0, graphql_1.Args)("limit", { type: () => Number, nullable: true, defaultValue: 10 })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PulseLeaderResolver.prototype, "getRecentActivities", null);
exports.PulseLeaderResolver = PulseLeaderResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pulse_leader_service_1.PulseLeaderService])
], PulseLeaderResolver);
//# sourceMappingURL=pulse-leader.resolver.js.map