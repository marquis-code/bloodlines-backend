import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"
import { PulseLeaderService } from "./pulse-leader.service"
import {
  PulseLeaderDashboardType,
  DonorSearchResultType,
  BroadcastMessageType,
  EscalationHistoryType,
  RecentActivityType,
} from "./types/pulse-leader.type"
import { SearchDonorsFilterDto } from "./dto/search-donors.dto"
import { BroadcastMessageDto } from "./dto/broadcast-message.dto"

@Resolver()
@UseGuards(JwtAuthGuard)
export class PulseLeaderResolver {
  constructor(private pulseLeaderService: PulseLeaderService) {}

  @Query(() => PulseLeaderDashboardType)
  async getPulseLeaderDashboard(@CurrentUser() user: any) {
    return this.pulseLeaderService.getPulseLeaderDashboard(user.userId)
  }

  @Query(() => [DonorSearchResultType])
  async searchDonors(
    @Args("filters") filters: SearchDonorsFilterDto,
    @CurrentUser() user: any
  ) {
    return this.pulseLeaderService.searchDonors(filters, user.userId)
  }

  @Query(() => [EscalationHistoryType])
  async getEscalationHistory(
    @Args("limit", { type: () => Number, nullable: true, defaultValue: 5 }) limit: number,
    @CurrentUser() user: any
  ) {
    return this.pulseLeaderService.getEscalationHistory(user.userId, limit)
  }

  @Mutation(() => BroadcastMessageType)
  async broadcastMessage(
    @Args("input") broadcastDto: BroadcastMessageDto,
    @CurrentUser() user: any
  ) {
    return this.pulseLeaderService.broadcastMessage(broadcastDto, user.userId)
  }

  @Query(() => [RecentActivityType])
  async getRecentActivities(
    @Args("limit", { type: () => Number, nullable: true, defaultValue: 10 }) limit: number,
    @CurrentUser() user: any
  ) {
    return this.pulseLeaderService.getRecentActivities(user.userId, limit)
  }
}