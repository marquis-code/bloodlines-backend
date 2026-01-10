import { Resolver, Query, Mutation, Subscription, Args } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { DonorService } from "./donor.service"
import { DonorDashboard, DonorProfile, NotificationPreference, MedicalEligibility } from "./types/donor-profile.type"
import { DonationRequest, DonationProgressUpdate } from "./types/donation-request.type"
import { ResourcesPage, ResourceCategoryEnum } from "./types/resource.type"
import { DonationFeedback } from "./types/feedback.type"
import { DonationHistory } from "./types/donation-history.type"
import { AcceptRequestInput } from "./dto/accept-request.dto"
import { RejectRequestInput } from "./dto/reject-request.dto"
import { SubmitFeedbackInput } from "./dto/submit-feedback.dto"
import { UpdateProgressInput } from "./dto/update-progress.dto"
import { UpdateProfileInput } from "./dto/update-profile.dto"
import { UpdateAvailabilityInput } from "./dto/update-availability.dto"
import { UpdateNotificationPreferencesInput } from "./dto/update-notification-preferences.dto"
import { NotificationGateway } from "../notification/notification.gateway"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@Resolver()
export class DonorResolver {
  constructor(
    private readonly donorService: DonorService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  // ============= QUERIES =============

  @UseGuards(JwtAuthGuard)
  @Query(() => DonorDashboard)
  async getDonorDashboard(@CurrentUser() user: any): Promise<DonorDashboard> {
    return this.donorService.getDonorDashboard(user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => DonorProfile)
  async getDonorProfile(@CurrentUser() user: any): Promise<DonorProfile> {
    return this.donorService.getDonorProfile(user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [DonationRequest])
  async getNearbyBloodRequests(
    @CurrentUser() user: any,
    @Args("radiusKm", { type: () => Number, nullable: true }) radiusKm?: number,
  ): Promise<DonationRequest[]> {
    return this.donorService.getNearbyBloodRequests(user.userId, radiusKm || 50)
  }

  @Query(() => DonationRequest)
  async getBloodRequestDetails(
    @Args("requestId") requestId: string,
  ): Promise<DonationRequest> {
    return this.donorService.getBloodRequestDetails(requestId)
  }

  @Query(() => ResourcesPage)
  async getResources(
    @Args("category", { type: () => ResourceCategoryEnum, nullable: true }) category?: ResourceCategoryEnum,
    @Args("searchQuery", { nullable: true }) searchQuery?: string,
  ): Promise<ResourcesPage> {
    return this.donorService.getResources(category || ResourceCategoryEnum.ALL, searchQuery)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [DonationHistory])
  async getDonationHistory(
    @CurrentUser() user: any,
    @Args("limit", { type: () => Number, nullable: true }) limit?: number,
  ): Promise<DonationHistory[]> {
    return this.donorService.getDonationHistory(user.userId, limit || 10)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => NotificationPreference)
  async getNotificationPreferences(@CurrentUser() user: any): Promise<NotificationPreference> {
    return this.donorService.getNotificationPreferences(user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => MedicalEligibility)
  async getMedicalEligibility(@CurrentUser() user: any): Promise<MedicalEligibility> {
    return this.donorService.getMedicalEligibility(user.userId)
  }

  // ============= MUTATIONS =============

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DonorProfile)
  async updateProfile(@CurrentUser() user: any, @Args("input") input: UpdateProfileInput): Promise<DonorProfile> {
    return this.donorService.updateProfile(user.userId, input)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DonorProfile)
  async updateAvailability(@CurrentUser() user: any, @Args("input") input: UpdateAvailabilityInput): Promise<DonorProfile> {
    return this.donorService.updateAvailability(user.userId, input)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => NotificationPreference)
  async updateNotificationPreferences(
    @CurrentUser() user: any,
    @Args("input") input: UpdateNotificationPreferencesInput,
  ): Promise<NotificationPreference> {
    return this.donorService.updateNotificationPreferences(user.userId, input)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DonationProgressUpdate)
  async acceptBloodRequest(@CurrentUser() user: any, @Args("input") input: AcceptRequestInput): Promise<DonationProgressUpdate> {
    const result = await this.donorService.acceptBloodRequest(user.userId, input)
    this.notificationGateway.broadcastDonationAccepted(result)
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async rejectBloodRequest(@CurrentUser() user: any, @Args("input") input: RejectRequestInput): Promise<boolean> {
    await this.donorService.rejectBloodRequest(user.userId, input)
    return true
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DonationProgressUpdate)
  async updateDonationProgress(@CurrentUser() user: any, @Args("input") input: UpdateProgressInput): Promise<DonationProgressUpdate> {
    const result = await this.donorService.updateDonationProgress(user.userId, input)
    this.notificationGateway.broadcastProgressUpdate(result)
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DonationFeedback)
  async submitDonationFeedback(@CurrentUser() user: any, @Args("input") input: SubmitFeedbackInput): Promise<DonationFeedback> {
    return this.donorService.submitFeedback(user.userId, input)
  }

  // ============= SUBSCRIPTIONS =============

  @Subscription(() => DonationProgressUpdate)
  donationProgressUpdated(@Args("requestId") requestId: string) {
    return this.notificationGateway.getDonationProgressStream(requestId)
  }

  @UseGuards(JwtAuthGuard)
  @Subscription(() => DonationRequest)
  nearbyBloodRequestAlert(@CurrentUser() user: any) {
    return this.notificationGateway.getBloodRequestStream(user.userId)
  }
}