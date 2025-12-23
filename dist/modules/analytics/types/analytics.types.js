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
const graphql_1 = require("@nestjs/graphql");
let BloodInventoryType = class BloodInventoryType {
};
exports.BloodInventoryType = BloodInventoryType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodInventoryType.prototype, "bloodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BloodInventoryType.prototype, "count", void 0);
exports.BloodInventoryType = BloodInventoryType = __decorate([
    (0, graphql_1.ObjectType)()
], BloodInventoryType);
let FulfillmentStatsType = class FulfillmentStatsType {
};
exports.FulfillmentStatsType = FulfillmentStatsType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], FulfillmentStatsType.prototype, "bloodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], FulfillmentStatsType.prototype, "percentage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], FulfillmentStatsType.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], FulfillmentStatsType.prototype, "fulfilled", void 0);
exports.FulfillmentStatsType = FulfillmentStatsType = __decorate([
    (0, graphql_1.ObjectType)()
], FulfillmentStatsType);
let UrgencyStatsType = class UrgencyStatsType {
};
exports.UrgencyStatsType = UrgencyStatsType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UrgencyStatsType.prototype, "urgency", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], UrgencyStatsType.prototype, "percentage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UrgencyStatsType.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UrgencyStatsType.prototype, "fulfilled", void 0);
exports.UrgencyStatsType = UrgencyStatsType = __decorate([
    (0, graphql_1.ObjectType)()
], UrgencyStatsType);
let ResponseCountType = class ResponseCountType {
};
exports.ResponseCountType = ResponseCountType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ResponseCountType.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ResponseCountType.prototype, "percentage", void 0);
exports.ResponseCountType = ResponseCountType = __decorate([
    (0, graphql_1.ObjectType)()
], ResponseCountType);
let DonorResponseStatsType = class DonorResponseStatsType {
};
exports.DonorResponseStatsType = DonorResponseStatsType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DonorResponseStatsType.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => ResponseCountType),
    __metadata("design:type", ResponseCountType)
], DonorResponseStatsType.prototype, "accepted", void 0);
__decorate([
    (0, graphql_1.Field)(() => ResponseCountType),
    __metadata("design:type", ResponseCountType)
], DonorResponseStatsType.prototype, "escalated", void 0);
__decorate([
    (0, graphql_1.Field)(() => ResponseCountType),
    __metadata("design:type", ResponseCountType)
], DonorResponseStatsType.prototype, "noResponse", void 0);
exports.DonorResponseStatsType = DonorResponseStatsType = __decorate([
    (0, graphql_1.ObjectType)()
], DonorResponseStatsType);
let TopBridgerType = class TopBridgerType {
};
exports.TopBridgerType = TopBridgerType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TopBridgerType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TopBridgerType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TopBridgerType.prototype, "facilityName", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TopBridgerType.prototype, "requestCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TopBridgerType.prototype, "totalUnitsConfirmed", void 0);
exports.TopBridgerType = TopBridgerType = __decorate([
    (0, graphql_1.ObjectType)()
], TopBridgerType);
let TimeSeriesDataType = class TimeSeriesDataType {
};
exports.TimeSeriesDataType = TimeSeriesDataType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TimeSeriesDataType.prototype, "month", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TimeSeriesDataType.prototype, "count", void 0);
exports.TimeSeriesDataType = TimeSeriesDataType = __decorate([
    (0, graphql_1.ObjectType)()
], TimeSeriesDataType);
let AnalyticsType = class AnalyticsType {
};
exports.AnalyticsType = AnalyticsType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], AnalyticsType.prototype, "totalRequests", void 0);
__decorate([
    (0, graphql_1.Field)(() => [BloodInventoryType]),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "bloodInventory", void 0);
__decorate([
    (0, graphql_1.Field)(() => [FulfillmentStatsType]),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "fulfillmentByBloodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => [UrgencyStatsType]),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "fulfillmentByUrgency", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AnalyticsType.prototype, "averageResponseTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => DonorResponseStatsType),
    __metadata("design:type", DonorResponseStatsType)
], AnalyticsType.prototype, "donorResponse", void 0);
__decorate([
    (0, graphql_1.Field)(() => [TopBridgerType]),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "topBridgers", void 0);
__decorate([
    (0, graphql_1.Field)(() => [TimeSeriesDataType]),
    __metadata("design:type", Array)
], AnalyticsType.prototype, "fulfillmentTimeSeries", void 0);
exports.AnalyticsType = AnalyticsType = __decorate([
    (0, graphql_1.ObjectType)()
], AnalyticsType);
//# sourceMappingURL=analytics.types.js.map