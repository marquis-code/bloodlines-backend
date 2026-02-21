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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./analytics.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getAnalytics() {
        const [totalRequests, bloodInventory, fulfillmentByBloodType, fulfillmentByUrgency, averageResponseTime, donorResponse, topBridgers, fulfillmentTimeSeries,] = await Promise.all([
            this.analyticsService.getTotalRequests(),
            this.analyticsService.getBloodInventory(),
            this.analyticsService.getRequestsFulfillmentByBloodType(),
            this.analyticsService.getRequestsFulfillmentByUrgency(),
            this.analyticsService.getAverageResponseTime(),
            this.analyticsService.getDonorResponseStats(),
            this.analyticsService.getTopBridgers(),
            this.analyticsService.getRequestFulfillmentTimeSeries(),
        ]);
        return {
            totalRequests,
            bloodInventory: Object.entries(bloodInventory).map(([type, count]) => ({
                bloodType: type,
                count,
            })),
            fulfillmentByBloodType,
            fulfillmentByUrgency,
            averageResponseTime,
            donorResponse,
            topBridgers,
            fulfillmentTimeSeries,
        };
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getAnalytics", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)("Analytics"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("analytics"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map