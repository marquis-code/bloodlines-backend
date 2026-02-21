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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulseLeaderDashboardType = exports.AnalyticsBreakdownType = exports.RecentActivityType = exports.BroadcastMessageType = exports.DonorSearchResultType = exports.EscalationHistoryType = exports.MonthlyCoordinationMetricsType = exports.DashboardStatisticsType = void 0;
const swagger_1 = require("@nestjs/swagger");
const blood_request_type_1 = require("../../blood-request/types/blood-request.type");
class DashboardStatisticsType {
}
exports.DashboardStatisticsType = DashboardStatisticsType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120 }),
    __metadata("design:type", Number)
], DashboardStatisticsType.prototype, "activeDonors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "12 mins" }),
    __metadata("design:type", String)
], DashboardStatisticsType.prototype, "avgResponseTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.85 }),
    __metadata("design:type", Number)
], DashboardStatisticsType.prototype, "escalationFulfillmentRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 450 }),
    __metadata("design:type", Number)
], DashboardStatisticsType.prototype, "totalRequests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 380 }),
    __metadata("design:type", Number)
], DashboardStatisticsType.prototype, "totalDonations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], DashboardStatisticsType.prototype, "newDonorsRecruited", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    __metadata("design:type", Number)
], DashboardStatisticsType.prototype, "emergenciesHandled", void 0);
class MonthlyCoordinationMetricsType {
}
exports.MonthlyCoordinationMetricsType = MonthlyCoordinationMetricsType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Feb" }),
    __metadata("design:type", String)
], MonthlyCoordinationMetricsType.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], MonthlyCoordinationMetricsType.prototype, "donations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], MonthlyCoordinationMetricsType.prototype, "requests", void 0);
class EscalationHistoryType {
}
exports.EscalationHistoryType = EscalationHistoryType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "esc_123" }),
    __metadata("design:type", String)
], EscalationHistoryType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "O-" }),
    __metadata("design:type", String)
], EscalationHistoryType.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CRITICAL" }),
    __metadata("design:type", String)
], EscalationHistoryType.prototype, "urgency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2 hours ago" }),
    __metadata("design:type", String)
], EscalationHistoryType.prototype, "posted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "FULFILLED" }),
    __metadata("design:type", String)
], EscalationHistoryType.prototype, "outcome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], EscalationHistoryType.prototype, "donorsResponded", void 0);
class DonorSearchResultType {
}
exports.DonorSearchResultType = DonorSearchResultType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "donor_123" }),
    __metadata("design:type", String)
], DonorSearchResultType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John Doe" }),
    __metadata("design:type", String)
], DonorSearchResultType.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], DonorSearchResultType.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "AA" }),
    __metadata("design:type", String)
], DonorSearchResultType.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.2 }),
    __metadata("design:type", Number)
], DonorSearchResultType.prototype, "distanceKm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-15" }),
    __metadata("design:type", String)
], DonorSearchResultType.prototype, "lastDonatedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "AVAILABLE" }),
    __metadata("design:type", String)
], DonorSearchResultType.prototype, "availability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+2348012345678" }),
    __metadata("design:type", String)
], DonorSearchResultType.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "john@example.com" }),
    __metadata("design:type", String)
], DonorSearchResultType.prototype, "email", void 0);
class BroadcastMessageType {
}
exports.BroadcastMessageType = BroadcastMessageType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "bc_123" }),
    __metadata("design:type", String)
], BroadcastMessageType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "req_123" }),
    __metadata("design:type", String)
], BroadcastMessageType.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "pulse_123" }),
    __metadata("design:type", String)
], BroadcastMessageType.prototype, "pulseLeaderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Urgent need for O- blood" }),
    __metadata("design:type", String)
], BroadcastMessageType.prototype, "messageContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "DELIVERED" }),
    __metadata("design:type", String)
], BroadcastMessageType.prototype, "deliveryStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T10:00:00Z" }),
    __metadata("design:type", String)
], BroadcastMessageType.prototype, "sentAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], BroadcastMessageType.prototype, "recipientCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], BroadcastMessageType.prototype, "deliveredCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], BroadcastMessageType.prototype, "readCount", void 0);
class RecentActivityType {
}
exports.RecentActivityType = RecentActivityType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "act_1" }),
    __metadata("design:type", String)
], RecentActivityType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "BLOOD_REQUEST" }),
    __metadata("design:type", String)
], RecentActivityType.prototype, "activityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "New blood request posted" }),
    __metadata("design:type", String)
], RecentActivityType.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Hospital Admin" }),
    __metadata("design:type", String)
], RecentActivityType.prototype, "actor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T11:00:00Z" }),
    __metadata("design:type", String)
], RecentActivityType.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "B+" }),
    __metadata("design:type", String)
], RecentActivityType.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], RecentActivityType.prototype, "units", void 0);
class AnalyticsBreakdownType {
}
exports.AnalyticsBreakdownType = AnalyticsBreakdownType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], AnalyticsBreakdownType.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.75 }),
    __metadata("design:type", Number)
], AnalyticsBreakdownType.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "GOOD" }),
    __metadata("design:type", String)
], AnalyticsBreakdownType.prototype, "status", void 0);
class PulseLeaderDashboardType {
}
exports.PulseLeaderDashboardType = PulseLeaderDashboardType;
__decorate([
    (0, swagger_1.ApiProperty)({ type: DashboardStatisticsType }),
    __metadata("design:type", DashboardStatisticsType)
], PulseLeaderDashboardType.prototype, "statistics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MonthlyCoordinationMetricsType] }),
    __metadata("design:type", Array)
], PulseLeaderDashboardType.prototype, "monthlyMetrics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [blood_request_type_1.BloodRequestType] }),
    __metadata("design:type", Array)
], PulseLeaderDashboardType.prototype, "recentBloodRequests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RecentActivityType] }),
    __metadata("design:type", Array)
], PulseLeaderDashboardType.prototype, "recentActivities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AnalyticsBreakdownType] }),
    __metadata("design:type", Array)
], PulseLeaderDashboardType.prototype, "requestFulfillmentByBloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AnalyticsBreakdownType] }),
    __metadata("design:type", Array)
], PulseLeaderDashboardType.prototype, "requestFulfillmentByUrgency", void 0);
//# sourceMappingURL=pulse-leader.type.js.map