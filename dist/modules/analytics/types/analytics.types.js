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
exports.AnalyticsType = exports.TimeSeriesDataType = exports.TopBridgerType = exports.DonorResponseStatsType = exports.ResponseCountType = exports.UrgencyStatsType = exports.FulfillmentStatsType = exports.BloodInventoryType = void 0;
const swagger_1 = require("@nestjs/swagger");
class BloodInventoryType {
}
exports.BloodInventoryType = BloodInventoryType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], BloodInventoryType.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], BloodInventoryType.prototype, "count", void 0);
class FulfillmentStatsType {
}
exports.FulfillmentStatsType = FulfillmentStatsType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], FulfillmentStatsType.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85.5 }),
    __metadata("design:type", Number)
], FulfillmentStatsType.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FulfillmentStatsType.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 17 }),
    __metadata("design:type", Number)
], FulfillmentStatsType.prototype, "fulfilled", void 0);
class UrgencyStatsType {
}
exports.UrgencyStatsType = UrgencyStatsType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "URGENT" }),
    __metadata("design:type", String)
], UrgencyStatsType.prototype, "urgency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 90.0 }),
    __metadata("design:type", Number)
], UrgencyStatsType.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], UrgencyStatsType.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9 }),
    __metadata("design:type", Number)
], UrgencyStatsType.prototype, "fulfilled", void 0);
class ResponseCountType {
}
exports.ResponseCountType = ResponseCountType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], ResponseCountType.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75.0 }),
    __metadata("design:type", Number)
], ResponseCountType.prototype, "percentage", void 0);
class DonorResponseStatsType {
}
exports.DonorResponseStatsType = DonorResponseStatsType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], DonorResponseStatsType.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResponseCountType }),
    __metadata("design:type", ResponseCountType)
], DonorResponseStatsType.prototype, "accepted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResponseCountType }),
    __metadata("design:type", ResponseCountType)
], DonorResponseStatsType.prototype, "escalated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResponseCountType }),
    __metadata("design:type", ResponseCountType)
], DonorResponseStatsType.prototype, "noResponse", void 0);
class TopBridgerType {
}
exports.TopBridgerType = TopBridgerType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user_123" }),
    __metadata("design:type", String)
], TopBridgerType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John Doe" }),
    __metadata("design:type", String)
], TopBridgerType.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mercy Hospital", required: false }),
    __metadata("design:type", String)
], TopBridgerType.prototype, "facilityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], TopBridgerType.prototype, "requestCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], TopBridgerType.prototype, "totalUnitsConfirmed", void 0);
class TimeSeriesDataType {
}
exports.TimeSeriesDataType = TimeSeriesDataType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Jan" }),
    __metadata("design:type", String)
], TimeSeriesDataType.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45 }),
    __metadata("design:type", Number)
], TimeSeriesDataType.prototype, "count", void 0);
class AnalyticsType {
}
exports.AnalyticsType = AnalyticsType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150 }),
    __metadata("design:type", Number)
], AnalyticsType.prototype, "totalRequests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BloodInventoryType] }),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "bloodInventory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FulfillmentStatsType] }),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "fulfillmentByBloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UrgencyStatsType] }),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "fulfillmentByUrgency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "15 mins" }),
    __metadata("design:type", String)
], AnalyticsType.prototype, "averageResponseTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DonorResponseStatsType }),
    __metadata("design:type", DonorResponseStatsType)
], AnalyticsType.prototype, "donorResponse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TopBridgerType] }),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "topBridgers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TimeSeriesDataType] }),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "fulfillmentTimeSeries", void 0);
//# sourceMappingURL=analytics.types.js.map