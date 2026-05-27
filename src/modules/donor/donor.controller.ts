import { Controller, Get, Post, Body, Query, UseGuards, Param, Put } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { DonorService } from "./donor.service"
import { AcceptRequestInput } from "./dto/accept-request.dto"
import { RejectRequestInput } from "./dto/reject-request.dto"
import { SubmitFeedbackInput } from "./dto/submit-feedback.dto"
import { UpdateProgressInput } from "./dto/update-progress.dto"
import { UpdateProfileInput } from "./dto/update-profile.dto"
import { UpdateAvailabilityInput } from "./dto/update-availability.dto"
import { UpdateNotificationPreferencesInput } from "./dto/update-notification-preferences.dto"
import { SetGoalDto } from "./dto/set-goal.dto"
import { SubmitHealthScreeningDto } from "./dto/submit-health-screening.dto"
import { ResourceCategoryEnum } from "./types/resource.type"
import { PaginationDto } from "../../common/dto/pagination.dto"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"
import { NotificationGateway } from "../notification/notification.gateway"

@ApiTags("Donor")
@ApiBearerAuth()
@Controller("donor")
export class DonorController {

    constructor(
        private readonly donorService: DonorService,
        private readonly notificationGateway: NotificationGateway,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("dashboard")
    async getDonorDashboard(@CurrentUser() user: any) {
        return this.donorService.getDonorDashboard(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("dashboard/summary")
    async getDonorDashboardSummary(@CurrentUser() user: any) {
        return this.donorService.getDonorDashboardSummary(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("stats")
    async getDonorStats(@CurrentUser() user: any) {
        return this.donorService.getDonorStats(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile/completion")
    async getDonorProfileCompletion(@CurrentUser() user: any) {
        return this.donorService.getDonorProfileCompletion(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getDonorProfile(@CurrentUser() user: any) {
        return this.donorService.getDonorProfile(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("nearby-requests")
    async getNearbyBloodRequests(
        @CurrentUser() user: any,
        @Query("radiusKm") radiusKm?: string,
        @Query() paginationDto?: PaginationDto
    ) {
        return this.donorService.getNearbyBloodRequests(user.userId, radiusKm ? Number(radiusKm) : 50, paginationDto?.page, paginationDto?.limit)
    }

    @Get("blood-request/:requestId")
    async getBloodRequestDetails(@Param("requestId") requestId: string) {
        return this.donorService.getBloodRequestDetails(requestId)
    }

    @Get("resources")
    async getResources(
        @Query("category") category?: ResourceCategoryEnum,
        @Query("search") searchQuery?: string,
    ) {
        return this.donorService.getResources(category || ResourceCategoryEnum.ALL, searchQuery)
    }

    @UseGuards(JwtAuthGuard)
    @Get("history")
    async getDonationHistory(
        @CurrentUser() user: any,
        @Query() paginationDto: PaginationDto,
        @Query("status") status?: string,
    ) {
        return this.donorService.getDonationHistoryPaginated(user.userId, paginationDto.page || 1, paginationDto.limit || 10, status)
    }

    @UseGuards(JwtAuthGuard)
    @Get("history/:donationId")
    async getDonationRecord(@CurrentUser() user: any, @Param("donationId") donationId: string) {
        return this.donorService.getDonationRecord(user.userId, donationId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("certificate/:donationId")
    async getDonationCertificate(@CurrentUser() user: any, @Param("donationId") donationId: string) {
        return this.donorService.getDonationCertificate(user.userId, donationId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("notification-preferences")
    async getNotificationPreferences(@CurrentUser() user: any) {
        return this.donorService.getNotificationPreferences(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("medical-eligibility")
    async getMedicalEligibility(@CurrentUser() user: any) {
        return this.donorService.getMedicalEligibility(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post("profile")
    async updateProfile(@CurrentUser() user: any, @Body() input: UpdateProfileInput) {
        return this.donorService.updateProfile(user.userId, input)
    }

    @UseGuards(JwtAuthGuard)
    @Post("availability")
    async updateAvailability(@CurrentUser() user: any, @Body() input: UpdateAvailabilityInput) {
        return this.donorService.updateAvailability(user.userId, input)
    }

    @UseGuards(JwtAuthGuard)
    @Post("notification-preferences")
    async updateNotificationPreferences(
        @CurrentUser() user: any,
        @Body() input: UpdateNotificationPreferencesInput,
    ) {
        return this.donorService.updateNotificationPreferences(user.userId, input)
    }

    @UseGuards(JwtAuthGuard)
    @Post("accept-request")
    async acceptBloodRequest(@CurrentUser() user: any, @Body() input: AcceptRequestInput) {
        const result = await this.donorService.acceptBloodRequest(user.userId, input)
        this.notificationGateway.broadcastDonationAccepted(result)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Post("reject-request")
    async rejectBloodRequest(@CurrentUser() user: any, @Body() input: RejectRequestInput) {
        await this.donorService.rejectBloodRequest(user.userId, input)
        return true
    }

    @UseGuards(JwtAuthGuard)
    @Post("update-progress")
    async updateDonationProgress(@CurrentUser() user: any, @Body() input: UpdateProgressInput) {
        const result = await this.donorService.updateDonationProgress(user.userId, input)
        this.notificationGateway.broadcastProgressUpdate(result)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Get("request-progress/:requestId")
    async getRequestProgress(@CurrentUser() user: any, @Param("requestId") requestId: string) {
        return this.donorService.getDonationRecord(user.userId, requestId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("badges")
    async getBadges(@CurrentUser() user: any) {
        return this.donorService.getBadges(user.userId)
    }

    @Get("leaderboard")
    async getLeaderboard(@Query("limit") limit?: string, @Query("region") region?: string) {
        return this.donorService.getLeaderboard(limit ? Number(limit) : 10, region)
    }

    @UseGuards(JwtAuthGuard)
    @Put("settings/anonymity")
    async toggleAnonymity(@CurrentUser() user: any, @Body("anonymous") anonymous: boolean) {
        return this.donorService.toggleAnonymity(user.userId, anonymous)
    }

    @Get("health-screening/questions")
    async getHealthScreeningQuestions() {
        return this.donorService.getHealthScreeningQuestions()
    }

    @UseGuards(JwtAuthGuard)
    @Post("health-screening/submit")
    async submitHealthScreening(@CurrentUser() user: any, @Body() dto: SubmitHealthScreeningDto) {
        return this.donorService.submitHealthScreening(user.userId, dto.answers)
    }

    @UseGuards(JwtAuthGuard)
    @Get("goal")
    async getGoal(@CurrentUser() user: any, @Query("year") year?: string) {
        return this.donorService.getGoal(user.userId, year ? Number(year) : new Date().getFullYear())
    }

    @UseGuards(JwtAuthGuard)
    @Post("goal")
    async setGoal(@CurrentUser() user: any, @Body() dto: SetGoalDto) {
        return this.donorService.setGoal(user.userId, dto.target, dto.year)
    }

    @UseGuards(JwtAuthGuard)
    @Get("shareable-impact")
    async getShareableImpact(@CurrentUser() user: any) {
        return this.donorService.getShareableImpact(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("activity-feed")
    async getActivityFeed(@Query() paginationDto: PaginationDto) {
        return this.donorService.getCommunityActivityFeed(paginationDto.page || 1, paginationDto.limit || 10)
    }

    @UseGuards(JwtAuthGuard)
    @Post("feedback")
    async submitDonationFeedback(@CurrentUser() user: any, @Body() input: SubmitFeedbackInput) {
        return this.donorService.submitFeedback(user.userId, input)
    }
}
