import { Resolver, Query } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { AnalyticsService } from "./analytics.service"
import { AnalyticsType } from "./types/analytics.types"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"

@Resolver()
export class AnalyticsResolver {
  constructor(private analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => AnalyticsType)
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
