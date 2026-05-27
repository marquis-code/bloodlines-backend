import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { AnalyticsService } from "./analytics.service"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@ApiTags("Analytics")
@ApiBearerAuth()
@Controller("analytics")
@UseGuards(JwtAuthGuard)
export class AnalyticsController {

    constructor(private analyticsService: AnalyticsService) { }

    @Get("bridger")
    async getBridgerAnalytics(@CurrentUser() user: any) {
        return this.analyticsService.getBridgerSpecificAnalytics(user.userId);
    }

    @Get()
    async getAnalytics() {
        const [
            totalRequests,
            bloodInventory,
            fulfillmentByBloodType,
            fulfillmentByUrgency,
            averageResponseTime,
            donorResponse,
            topBridgers,
            fulfillmentTimeSeries,
        ] = await Promise.all([
            this.analyticsService.getTotalRequests(),
            this.analyticsService.getBloodInventory(),
            this.analyticsService.getRequestsFulfillmentByBloodType(),
            this.analyticsService.getRequestsFulfillmentByUrgency(),
            this.analyticsService.getAverageResponseTime(),
            this.analyticsService.getDonorResponseStats(),
            this.analyticsService.getTopBridgers(),
            this.analyticsService.getRequestFulfillmentTimeSeries(),
        ])

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
        }
    }
}
