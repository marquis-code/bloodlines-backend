import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"
import { PulseLeaderService } from "./pulse-leader.service"
import { SearchDonorsFilterDto } from "./dto/search-donors.dto"
import { BroadcastMessageDto } from "./dto/broadcast-message.dto"

@ApiTags("Pulse Leader")
@ApiBearerAuth()
@Controller("pulse-leader")
@UseGuards(JwtAuthGuard)
export class PulseLeaderController {

    constructor(private pulseLeaderService: PulseLeaderService) { }

    @Get("dashboard")
    async getPulseLeaderDashboard(@CurrentUser() user: any) {
        return this.pulseLeaderService.getPulseLeaderDashboard(user.userId)
    }

    @Post("search-donors")
    async searchDonors(
        @Body() filters: SearchDonorsFilterDto,
        @CurrentUser() user: any
    ) {
        return this.pulseLeaderService.searchDonors(filters, user.userId)
    }

    @Get("escalation-history")
    async getEscalationHistory(
        @Query("limit") limit = 5,
        @CurrentUser() user: any
    ) {
        return this.pulseLeaderService.getEscalationHistory(user.userId, Number(limit))
    }

    @Post("broadcast")
    async broadcastMessage(
        @Body() broadcastDto: BroadcastMessageDto,
        @CurrentUser() user: any
    ) {
        return this.pulseLeaderService.broadcastMessage(broadcastDto, user.userId)
    }

    @Get("recent-activities")
    async getRecentActivities(
        @Query("limit") limit = 10,
        @CurrentUser() user: any
    ) {
        return this.pulseLeaderService.getRecentActivities(user.userId, Number(limit))
    }
}
