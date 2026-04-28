import { Controller, Get, Post, Body, Query, UseGuards, Param } from "@nestjs/common"
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from "@nestjs/swagger"
import { DonorService } from "./donor.service"
import { AcceptRequestInput } from "./dto/accept-request.dto"
import { RejectRequestInput } from "./dto/reject-request.dto"
import { SubmitFeedbackInput } from "./dto/submit-feedback.dto"
import { UpdateProgressInput } from "./dto/update-progress.dto"
import { UpdateProfileInput } from "./dto/update-profile.dto"
import { UpdateAvailabilityInput } from "./dto/update-availability.dto"
import { UpdateNotificationPreferencesInput } from "./dto/update-notification-preferences.dto"
import { ResourceCategoryEnum } from "./types/resource.type"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"
import { NotificationGateway } from "../notification/notification.gateway"
import {
    DonorDashboard,
    DonorProfile,
    MedicalEligibility,
    NotificationPreference,
} from "./types/donor-profile.type"
import { DonationHistory } from "./types/donation-history.type"
import { DonationFeedback } from "./types/feedback.type"
import { DonationProgressUpdate, DonationRequest } from "./types/donation-request.type"
import { ResourcesPage } from "./types/resource.type"

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
    @ApiOperation({ summary: "Get the donor dashboard data" })
    @ApiOkResponse({ type: DonorDashboard })
    async getDonorDashboard(@CurrentUser() user: any) {
        return this.donorService.getDonorDashboard(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    @ApiOperation({ summary: "Get the donor profile" })
    @ApiOkResponse({ type: DonorProfile })
    async getDonorProfile(@CurrentUser() user: any) {
        return this.donorService.getDonorProfile(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("nearby-requests")
    @ApiOperation({ summary: "Get nearby blood requests matching the donor's blood type" })
    @ApiQuery({
        name: "radiusKm",
        required: false,
        type: Number,
        description: "Optional distance radius in kilometers. Defaults to 50.",
        example: 50,
    })
    @ApiOkResponse({ type: [DonationRequest] })
    async getNearbyBloodRequests(
        @CurrentUser() user: any,
        @Query("radiusKm") radiusKm?: string,
    ) {
        return this.donorService.getNearbyBloodRequests(user.userId, radiusKm ? Number(radiusKm) : 50)
    }

    @Get("blood-request/:requestId")
    @ApiOperation({ summary: "Get a single blood request for donor review" })
    @ApiParam({ name: "requestId", description: "Blood request id" })
    @ApiOkResponse({ type: DonationRequest })
    async getBloodRequestDetails(@Param("requestId") requestId: string) {
        return this.donorService.getBloodRequestDetails(requestId)
    }

    @Get("resources")
    @ApiOperation({ summary: "Get donor learning resources" })
    @ApiQuery({
        name: "category",
        required: false,
        enum: ResourceCategoryEnum,
        description: "Optional resource category filter.",
    })
    @ApiQuery({
        name: "search",
        required: false,
        type: String,
        description: "Optional search term for resource title or description.",
    })
    @ApiOkResponse({ type: ResourcesPage })
    async getResources(
        @Query("category") category?: ResourceCategoryEnum,
        @Query("search") searchQuery?: string,
    ) {
        return this.donorService.getResources(category || ResourceCategoryEnum.ALL, searchQuery)
    }

    @UseGuards(JwtAuthGuard)
    @Get("history")
    @ApiOperation({ summary: "Get donor donation history" })
    @ApiQuery({
        name: "limit",
        required: false,
        type: Number,
        description: "Maximum number of donation history records to return. Defaults to 10.",
        example: 10,
    })
    @ApiOkResponse({ type: [DonationHistory] })
    async getDonationHistory(
        @CurrentUser() user: any,
        @Query("limit") limit?: string,
    ) {
        return this.donorService.getDonationHistory(user.userId, limit ? Number(limit) : 10)
    }

    @UseGuards(JwtAuthGuard)
    @Get("notification-preferences")
    @ApiOperation({ summary: "Get donor notification preferences" })
    @ApiOkResponse({ type: NotificationPreference })
    async getNotificationPreferences(@CurrentUser() user: any) {
        return this.donorService.getNotificationPreferences(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("medical-eligibility")
    @ApiOperation({ summary: "Get donor medical eligibility summary" })
    @ApiOkResponse({ type: MedicalEligibility })
    async getMedicalEligibility(@CurrentUser() user: any) {
        return this.donorService.getMedicalEligibility(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post("profile")
    @ApiOperation({ summary: "Update donor profile details" })
    @ApiOkResponse({ type: DonorProfile })
    async updateProfile(@CurrentUser() user: any, @Body() input: UpdateProfileInput) {
        return this.donorService.updateProfile(user.userId, input)
    }

    @UseGuards(JwtAuthGuard)
    @Post("availability")
    @ApiOperation({ summary: "Update donor availability status" })
    @ApiOkResponse({ type: DonorProfile })
    async updateAvailability(@CurrentUser() user: any, @Body() input: UpdateAvailabilityInput) {
        return this.donorService.updateAvailability(user.userId, input)
    }

    @UseGuards(JwtAuthGuard)
    @Post("notification-preferences")
    @ApiOperation({ summary: "Update donor notification preferences" })
    @ApiOkResponse({ type: NotificationPreference })
    async updateNotificationPreferences(
        @CurrentUser() user: any,
        @Body() input: UpdateNotificationPreferencesInput,
    ) {
        return this.donorService.updateNotificationPreferences(user.userId, input)
    }

    @UseGuards(JwtAuthGuard)
    @Post("accept-request")
    @ApiOperation({ summary: "Accept a blood request" })
    @ApiOkResponse({ type: DonationProgressUpdate })
    async acceptBloodRequest(@CurrentUser() user: any, @Body() input: AcceptRequestInput) {
        const result = await this.donorService.acceptBloodRequest(user.userId, input)
        this.notificationGateway.broadcastDonationAccepted(result)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Post("reject-request")
    @ApiOperation({ summary: "Reject a blood request" })
    @ApiOkResponse({ schema: { type: "boolean", example: true } })
    async rejectBloodRequest(@CurrentUser() user: any, @Body() input: RejectRequestInput) {
        await this.donorService.rejectBloodRequest(user.userId, input)
        return true
    }

    @UseGuards(JwtAuthGuard)
    @Post("update-progress")
    @ApiOperation({ summary: "Update donation journey progress for a request" })
    @ApiOkResponse({ type: DonationProgressUpdate })
    async updateDonationProgress(@CurrentUser() user: any, @Body() input: UpdateProgressInput) {
        const result = await this.donorService.updateDonationProgress(user.userId, input)
        this.notificationGateway.broadcastProgressUpdate(result)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Post("feedback")
    @ApiOperation({ summary: "Submit donor feedback for a request" })
    @ApiOkResponse({ type: DonationFeedback })
    async submitDonationFeedback(@CurrentUser() user: any, @Body() input: SubmitFeedbackInput) {
        return this.donorService.submitFeedback(user.userId, input)
    }
}
