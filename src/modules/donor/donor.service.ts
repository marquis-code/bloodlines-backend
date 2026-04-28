import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { DonorResponse } from "../../common/enums/donor-response.enum"
import { RequestStatus } from "../../common/enums/request-status.enum"
import { UserRole } from "../../common/enums/role.enum"
import { BloodRequest } from "../blood-request/schema/blood-request.schema"
import { NotificationService } from "../notification/notification.service"
import { User } from "../user/schemas/user.schema"
import { AcceptRequestInput } from "./dto/accept-request.dto"
import { RejectRequestInput } from "./dto/reject-request.dto"
import { SubmitFeedbackInput } from "./dto/submit-feedback.dto"
import { UpdateAvailabilityInput } from "./dto/update-availability.dto"
import { UpdateNotificationPreferencesInput } from "./dto/update-notification-preferences.dto"
import { UpdateProfileInput } from "./dto/update-profile.dto"
import { UpdateProgressInput } from "./dto/update-progress.dto"
import { DonationHistory } from "./types/donation-history.type"
import {
  DonationProgressStatusEnum,
  DonationProgressUpdate,
  DonationRequest,
  DonationRequestStatusEnum,
} from "./types/donation-request.type"
import {
  DonorDashboard,
  DonorProfile,
  MedicalEligibility,
  NotificationPreference,
} from "./types/donor-profile.type"
import { DonationFeedback } from "./types/feedback.type"
import { Resource, ResourceCategoryEnum, ResourcesPage } from "./types/resource.type"

@Injectable()
export class DonorService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(BloodRequest.name) private bloodRequestModel: Model<BloodRequest>,
    private notificationService: NotificationService,
  ) {}

  // ============= DASHBOARD & PROFILE =============

  async getDonorDashboard(userId: string): Promise<DonorDashboard> {
    const user = await this.getDonorUserOrThrow(userId)
    const welcomeMessage = `Welcome back, ${this.getFirstName(user.fullName)}!`

    const nearbyRequests = await this.getNearbyBloodRequests(userId, 50)
    const impact = await this.calculateDonorImpact(userId, user)
    const profileCompletion = this.calculateProfileCompletion(user)
    const donorStatus = this.getDonorStatus(user)
    const achievements = await this.getUserAchievements(user, impact)
    const donationHistory = await this.getDonationHistory(userId, 5)
    const communityActivity = await this.getCommunityActivity()

    return {
      welcomeMessage,
      hero: {
        title: welcomeMessage,
        subtitle: this.buildNearbyRequestsSubtitle(nearbyRequests.length),
        nearbyRequestsCount: nearbyRequests.length,
      },
      profileCompletion,
      donorStatus,
      impact,
      achievements,
      nearbyBloodRequests: nearbyRequests,
      donationHistory,
      communityActivity,
    }
  }

  async getDonorProfile(userId: string): Promise<DonorProfile> {
    const user = await this.getDonorUserOrThrow(userId)

    const latitude = user.geoLocation?.coordinates?.[1] || 0
    const longitude = user.geoLocation?.coordinates?.[0] || 0

    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      phone: user.phoneNumber || "",
      bloodType: user.bloodGroup || "",
      genotype: user.genotype,
      gender: user.gender,
      latitude,
      longitude,
      availability: user.isAvailable ? "Available" : "Unavailable",
      emergencyContact: user.emergencyContact,
      emergencyContactPhone: user.emergencyContactPhone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<DonorProfile> {
    await this.getDonorUserOrThrow(userId)

    const updateData: any = {}

    if (input.fullName) updateData.fullName = input.fullName
    if (input.phone) updateData.phoneNumber = input.phone
    if (input.bloodType) updateData.bloodGroup = input.bloodType
    if (input.genotype) updateData.genotype = input.genotype
    if (input.gender) updateData.gender = input.gender
    if (input.emergencyContact) updateData.emergencyContact = input.emergencyContact
    if (input.emergencyContactPhone) updateData.emergencyContactPhone = input.emergencyContactPhone

    if (input.latitude !== undefined && input.longitude !== undefined) {
      updateData.geoLocation = {
        type: "Point",
        coordinates: [input.longitude, input.latitude],
      }
    }

    if (input.availability) {
      updateData.isAvailable = input.availability === "Available"
    }

    const user = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true })
    if (!user) throw new NotFoundException("User not found")

    return this.getDonorProfile(userId)
  }

  async updateAvailability(userId: string, input: UpdateAvailabilityInput): Promise<DonorProfile> {
    await this.getDonorUserOrThrow(userId)

    const isAvailable = input.status === "Available"
    const user = await this.userModel.findByIdAndUpdate(userId, { isAvailable }, { new: true })
    if (!user) throw new NotFoundException("User not found")

    return this.getDonorProfile(userId)
  }

  // ============= NOTIFICATIONS & PREFERENCES =============

  async getNotificationPreferences(userId: string): Promise<NotificationPreference> {
    return {
      id: userId,
      userId,
      emergencyAlerts: true,
      donationReminders: true,
      communityUpdates: false,
      reminderFrequency: "daily",
      updatedAt: new Date(),
    }
  }

  async updateNotificationPreferences(
    userId: string,
    input: UpdateNotificationPreferencesInput,
  ): Promise<NotificationPreference> {
    return this.getNotificationPreferences(userId)
  }

  // ============= BLOOD REQUESTS & DONATIONS =============

  async getNearbyBloodRequests(userId: string, radiusKm: number): Promise<DonationRequest[]> {
    const user = await this.getDonorUserOrThrow(userId)
    const userLat = user.geoLocation?.coordinates?.[1]
    const userLng = user.geoLocation?.coordinates?.[0]

    if (!user.bloodGroup) {
      return []
    }

    const requests = await this.bloodRequestModel
      .find({
        status: {
          $in: [RequestStatus.PENDING, RequestStatus.CONFIRMED, RequestStatus.IN_PROGRESS],
        },
        bloodType: user.bloodGroup,
        createdBy: { $ne: user._id },
      })
      .populate("createdBy", "fullName facilityName facilityAddress address city state location geoLocation")
      .sort({ createdAt: -1 })
      .limit(25)
      .lean()

    return requests
      .map((req: any) => {
        const reqLat = req.createdBy?.geoLocation?.coordinates?.[1]
        const reqLng = req.createdBy?.geoLocation?.coordinates?.[0]
        const hasCoordinates = [userLat, userLng, reqLat, reqLng].every(
          (coordinate) => typeof coordinate === "number",
        )

        const distance = hasCoordinates ? this.calculateDistance(userLat, userLng, reqLat, reqLng) : 0

        return {
          id: req._id.toString(),
          bloodType: req.bloodType,
          priority: req.priorityLevel,
          unitsNeeded: req.unitsNeeded,
          hospitalName: req.createdBy?.facilityName || "Unknown Hospital",
          address: this.formatFacilityAddress(req.createdBy),
          contactPhone: req.contactPhone || "",
          instructions: req.additionalNotes || "",
          createdAt: req.createdAt,
          status: this.mapRequestStatus(req.status),
          distance,
        }
      })
      .filter((request) => {
        if (typeof userLat !== "number" || typeof userLng !== "number" || request.distance === 0) {
          return true
        }

        return request.distance <= radiusKm
      })
      .slice(0, 10)
  }

  async getBloodRequestDetails(requestId: string): Promise<DonationRequest> {
    const request = await this.bloodRequestModel
      .findById(requestId)
      .populate("createdBy", "fullName facilityName facilityAddress address city state location geoLocation")
      .lean()

    if (!request) throw new NotFoundException("Request not found")

    const createdBy: any = request.createdBy

    return {
      id: request._id.toString(),
      bloodType: request.bloodType,
      priority: request.priorityLevel,
      unitsNeeded: request.unitsNeeded,
      hospitalName: createdBy?.facilityName || "Unknown Hospital",
      address: this.formatFacilityAddress(createdBy),
      contactPhone: request.contactPhone || "",
      instructions: request.additionalNotes || "",
      createdAt: request.createdAt,
      status: this.mapRequestStatus(request.status),
      distance: 0,
    }
  }

  async acceptBloodRequest(userId: string, input: AcceptRequestInput): Promise<DonationProgressUpdate> {
    await this.getDonorUserOrThrow(userId)

    const request = await this.bloodRequestModel.findById(input.requestId)
    if (!request) throw new NotFoundException("Request not found")

    if ([RequestStatus.FULFILLED, RequestStatus.CANCELLED, RequestStatus.EXPIRED].includes(request.status)) {
      throw new BadRequestException("This request is no longer active")
    }

    if (!request.assignedDonors) {
      request.assignedDonors = []
    }

    const userObjectId = userId as any
    if (!request.assignedDonors.some((id) => id.toString() === userId)) {
      request.assignedDonors.push(userObjectId)
    }

    request.status = RequestStatus.IN_PROGRESS
    request.donorResponseStatus = DonorResponse.ACCEPTED
    await request.save()

    try {
      const donor = await this.userModel.findById(userId)
      if (donor) {
        await this.notificationService.notifyDonorAcceptance(request.createdBy.toString(), {
          fullName: donor.fullName,
          bloodGroup: donor.bloodGroup,
          requestId: request._id,
        })
      }
    } catch (error) {
      console.error("Failed to send donor acceptance email notification", error)
    }

    return {
      requestId: request._id.toString(),
      status: DonationProgressStatusEnum.ACCEPTED,
      timestamp: new Date(),
      location: `${input.latitude},${input.longitude}`,
    }
  }

  async rejectBloodRequest(userId: string, input: RejectRequestInput): Promise<void> {
    return
  }

  async updateDonationProgress(userId: string, input: UpdateProgressInput): Promise<DonationProgressUpdate> {
    await this.getDonorUserOrThrow(userId)

    const request = await this.bloodRequestModel.findById(input.requestId)
    if (!request) throw new NotFoundException("Request not found")

    if (input.status === DonationProgressStatusEnum.DONATION_COMPLETE) {
      request.status = RequestStatus.FULFILLED
      request.unitsConfirmed += 1
      request.fulfillmentDate = new Date()

      const donor = await this.userModel.findById(userId)
      if (donor) {
        donor.donationCount = (donor.donationCount || 0) + 1
        donor.lastDonationDate = new Date()
        donor.nextEligibleDate = this.calculateEligibilityDateFromLastDonation(donor.lastDonationDate, donor.gender)
        await donor.save()
      }
    } else if (
      input.status === DonationProgressStatusEnum.ON_YOUR_WAY ||
      input.status === DonationProgressStatusEnum.ARRIVED_AT_HOSPITAL
    ) {
      request.status = RequestStatus.IN_PROGRESS
    }

    await request.save()

    if (input.status === DonationProgressStatusEnum.DONATION_COMPLETE && request.status === RequestStatus.FULFILLED) {
      try {
        const donorIds = request.assignedDonors?.map((id) => id.toString()) || []
        await this.notificationService.notifyRequestFulfilled(donorIds, request._id.toString())
      } catch (error) {
        console.error("Failed to send request fulfillment email notifications", error)
      }
    }

    return {
      requestId: request._id.toString(),
      status: input.status,
      timestamp: new Date(),
      location: input.location,
      estimatedArrivalTime: input.estimatedArrivalTime,
    }
  }

  async getDonationHistory(userId: string, limit: number): Promise<DonationHistory[]> {
    await this.getDonorUserOrThrow(userId)

    const history = await this.bloodRequestModel
      .find({
        assignedDonors: userId,
        status: RequestStatus.FULFILLED,
      })
      .populate("createdBy", "fullName facilityName facilityAddress address city state location")
      .sort({ fulfillmentDate: -1, createdAt: -1 })
      .limit(limit)
      .lean()

    return history.map((req: any) => {
      const createdBy = req.createdBy || {}

      return {
        id: req._id.toString(),
        hospitalName: createdBy.facilityName || "Unknown Hospital",
        bloodType: req.bloodType,
        unitsGiven: 1,
        donatedAt: req.fulfillmentDate || req.createdAt,
        status: req.status,
        facilityName: createdBy.facilityName || "",
        facilityAddress: this.formatFacilityAddress(createdBy),
        facilityPhone: req.contactPhone || "",
      }
    })
  }

  // ============= RESOURCES =============

  async getResources(category: ResourceCategoryEnum, searchQuery?: string): Promise<ResourcesPage> {
    const allResources: Resource[] = [
      {
        id: "1",
        title: "Blood Donation 101",
        description: "A 7 series course on everything you need to know about the blood donation process",
        category: ResourceCategoryEnum.COURSES,
        imageUrl: "/images/blood-donation-101.png",
        duration: "5 Mins",
        actionText: "Take course",
        actionUrl: "/courses/blood-donation-101",
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Post-Donation Care",
        description: "Learn how to take care of yourself after donating blood",
        category: ResourceCategoryEnum.ARTICLES,
        imageUrl: "/images/post-donation-care.png",
        duration: "3 Mins",
        actionText: "Read article",
        actionUrl: "/articles/post-donation-care",
        isFeatured: false,
        createdAt: new Date(),
      },
    ]

    let filtered =
      category === ResourceCategoryEnum.ALL ? allResources : allResources.filter((resource) => resource.category === category)

    if (searchQuery) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return {
      resources: filtered,
      totalCount: filtered.length,
      categories: Object.values(ResourceCategoryEnum),
    }
  }

  // ============= FEEDBACK =============

  async submitFeedback(userId: string, input: SubmitFeedbackInput): Promise<DonationFeedback> {
    return {
      id: new Date().getTime().toString(),
      requestId: input.requestId,
      rating: input.rating,
      comments: input.comments,
      submittedAt: new Date(),
    }
  }

  // ============= HELPER METHODS =============

  private async getDonorUserOrThrow(userId: string) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    if (user.role !== UserRole.DONOR) {
      throw new ForbiddenException("Only donors can access donor data")
    }

    return user
  }

  private calculateProfileCompletion(user: any): any {
    const fields = [
      "fullName",
      "email",
      "phoneNumber",
      "bloodGroup",
      "genotype",
      "geoLocation",
      "emergencyContact",
      "emergencyContactPhone",
    ]

    const completedFields = fields.filter((field) => {
      const value = user[field]
      if (field === "geoLocation") {
        return value?.coordinates?.length === 2
      }

      return value !== undefined && value !== null && value !== ""
    })

    const remainingFields = fields.filter((field) => !completedFields.includes(field))
    const nextSteps = this.buildProfileNextSteps(remainingFields)

    return {
      title: "Complete Your Profile",
      percentComplete: Math.round((completedFields.length / fields.length) * 100),
      completedFields,
      remainingFields,
      message:
        nextSteps.length > 0
          ? `${this.joinSentenceParts(nextSteps)} to help us match you with nearby requests.`
          : "Your donor profile is ready for matching.",
      nextSteps,
    }
  }

  private getDonorStatus(user: any): any {
    const nextEligibilityDate = this.calculateNextEligibilityDate(user)
    const isEligibleNow = !user.lastDonationDate || nextEligibilityDate.getTime() <= Date.now()

    return {
      availability: user.isAvailable ? "Available" : "Unavailable",
      bloodType: user.bloodGroup || "Unknown",
      nextEligibilityDate,
      lastDonationDate: user.lastDonationDate,
      nextEligibilityLabel: isEligibleNow ? "Eligible now" : this.formatDate(nextEligibilityDate),
      isEligibleNow,
    }
  }

  private calculateNextEligibilityDate(user: any): Date {
    if (user.lastDonationDate) {
      return this.calculateEligibilityDateFromLastDonation(new Date(user.lastDonationDate), user.gender)
    }

    if (user.nextEligibleDate) {
      return new Date(user.nextEligibleDate)
    }

    return new Date()
  }

  private calculateEligibilityDateFromLastDonation(lastDonationDate: Date, gender: string): Date {
    const waitingPeriodDays = gender === "Female" ? 112 : 56
    const nextDate = new Date(lastDonationDate)
    nextDate.setDate(nextDate.getDate() + waitingPeriodDays)
    return nextDate
  }

  async getMedicalEligibility(userId: string): Promise<MedicalEligibility> {
    const user = await this.getDonorUserOrThrow(userId)

    const nextEligibleDate = this.calculateNextEligibilityDate(user)
    const today = new Date()
    const isEligible = today >= nextEligibleDate

    const daysSinceLastDonation = user.lastDonationDate
      ? Math.floor((today.getTime() - user.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24))
      : 999

    const daysUntilEligible = Math.max(
      0,
      Math.floor((nextEligibleDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    )

    return {
      isEligible,
      nextEligibleDate,
      reason: isEligible ? undefined : "Still in waiting period between donations",
      daysSinceLastDonation,
      daysUntilEligible,
    }
  }

  private async calculateDonorImpact(userId: string, user: any): Promise<any> {
    const fulfilledDonations = await this.bloodRequestModel.countDocuments({
      assignedDonors: userId,
      status: RequestStatus.FULFILLED,
    })

    const emergenciesHandled = await this.bloodRequestModel.countDocuments({
      assignedDonors: userId,
      status: RequestStatus.FULFILLED,
      priorityLevel: "CRITICAL",
    })

    const totalDonations = Math.max(user.donationCount || 0, user.totalDonations || 0, fulfilledDonations)
    const livesPotentiallySaved = totalDonations * 3
    const impactLevel = this.getImpactLevel(totalDonations)

    return {
      totalDonations,
      livesImpacted: livesPotentiallySaved,
      livesPotentiallySaved,
      emergenciesHandled,
      newDonorsRecruited: Math.floor(totalDonations / 5),
      level: impactLevel.level,
      levelLabel: `Level ${impactLevel.level}`,
      message: impactLevel.message,
      nextLevelDonationTarget: impactLevel.nextTarget,
    }
  }

  private async getUserAchievements(user: any, impact: any): Promise<any[]> {
    const activeResponses = await this.bloodRequestModel.countDocuments({
      assignedDonors: user._id,
      status: { $in: [RequestStatus.CONFIRMED, RequestStatus.IN_PROGRESS] },
    })

    const achievements = [
      {
        id: "bronze-lifesaver",
        name: "Bronze Lifesaver",
        description: `${impact.totalDonations} donation${impact.totalDonations === 1 ? "" : "s"} completed`,
        badge: "🥉",
        icon: "🥉",
        unlockedAt: user.lastDonationDate || user.createdAt || new Date(),
        level: 1,
        streakDays: 0,
        unlocked: impact.totalDonations >= 1,
      },
      {
        id: "quick-responder",
        name: "Quick Responder",
        description:
          activeResponses > 0
            ? `Responding to ${activeResponses} active request${activeResponses === 1 ? "" : "s"}`
            : "Availability turned on for emergency requests",
        badge: "⚡",
        icon: "⚡",
        unlockedAt: user.updatedAt || user.createdAt || new Date(),
        level: 2,
        streakDays: 0,
        unlocked: Boolean(user.isAvailable || activeResponses > 0 || impact.totalDonations >= 1),
      },
      {
        id: "community-hero",
        name: "Community Hero",
        description: `Potentially saved ${impact.livesPotentiallySaved} lives`,
        badge: "🏆",
        icon: "🏆",
        unlockedAt: user.lastDonationDate || user.createdAt || new Date(),
        level: 3,
        streakDays: 0,
        unlocked: impact.totalDonations >= 3 || impact.livesPotentiallySaved >= 9,
      },
    ]

    return achievements.filter((achievement) => achievement.unlocked)
  }

  private async getCommunityActivity(): Promise<any[]> {
    const activities = await this.bloodRequestModel
      .find({
        status: RequestStatus.FULFILLED,
        assignedDonors: { $exists: true, $ne: [] },
      })
      .populate("createdBy", "facilityName")
      .populate("assignedDonors", "fullName")
      .sort({ fulfillmentDate: -1, updatedAt: -1 })
      .limit(5)
      .lean()

    return activities.flatMap((request: any) => {
      const donor = Array.isArray(request.assignedDonors) ? request.assignedDonors[0] : undefined
      if (!donor?.fullName) {
        return []
      }

      return [
        {
          id: request._id.toString(),
          message: `donated ${request.bloodType} blood at ${request.createdBy?.facilityName || "a nearby hospital"}`,
          actorName: this.abbreviateName(donor.fullName),
          timestamp: request.fulfillmentDate || request.updatedAt || request.createdAt || new Date(),
          icon: "❤️",
        },
      ]
    })
  }

  private buildProfileNextSteps(remainingFields: string[]): string[] {
    const steps = new Set<string>()

    if (remainingFields.includes("emergencyContact") || remainingFields.includes("emergencyContactPhone")) {
      steps.add("Add your emergency contact")
    }

    if (remainingFields.includes("geoLocation")) {
      steps.add("Verify your location")
    }

    if (remainingFields.includes("bloodGroup")) {
      steps.add("Add your blood type")
    }

    if (remainingFields.includes("genotype")) {
      steps.add("Add your genotype")
    }

    if (remainingFields.includes("phoneNumber")) {
      steps.add("Update your phone number")
    }

    return Array.from(steps)
  }

  private joinSentenceParts(parts: string[]): string {
    if (parts.length === 0) {
      return ""
    }

    if (parts.length === 1) {
      return parts[0]
    }

    if (parts.length === 2) {
      return `${parts[0]} and ${parts[1].toLowerCase()}`
    }

    const leadingParts = parts.slice(0, -1)
    const lastPart = parts[parts.length - 1].toLowerCase()

    return `${leadingParts.join(", ")}, and ${lastPart}`
  }

  private getImpactLevel(totalDonations: number) {
    const levels = [
      { level: 1, minDonations: 0, nextTarget: 3, message: "Your first donation can save up to 3 lives." },
      { level: 2, minDonations: 3, nextTarget: 6, message: "You are building a lifesaving streak." },
      { level: 3, minDonations: 6, nextTarget: 10, message: "Way to go lifesaver!" },
      { level: 4, minDonations: 10, nextTarget: 20, message: "Your consistency is making a huge impact." },
      { level: 5, minDonations: 20, nextTarget: undefined, message: "Your impact is extraordinary." },
    ]

    const currentLevel =
      levels
        .slice()
        .reverse()
        .find((level) => totalDonations >= level.minDonations) || levels[0]

    return {
      level: currentLevel.level,
      nextTarget: currentLevel.nextTarget,
      message: currentLevel.message,
    }
  }

  private buildNearbyRequestsSubtitle(count: number): string {
    if (count === 0) {
      return "No blood requests near you need your help right now"
    }

    if (count === 1) {
      return "1 blood request near you needs your help"
    }

    return `${count} blood requests near you need your help`
  }

  private mapRequestStatus(status: RequestStatus): DonationRequestStatusEnum {
    switch (status) {
      case RequestStatus.PENDING:
        return DonationRequestStatusEnum.PENDING
      case RequestStatus.CONFIRMED:
        return DonationRequestStatusEnum.CONFIRMED
      case RequestStatus.IN_PROGRESS:
        return DonationRequestStatusEnum.IN_PROGRESS
      case RequestStatus.FULFILLED:
        return DonationRequestStatusEnum.FULFILLED
      case RequestStatus.CANCELLED:
        return DonationRequestStatusEnum.CANCELLED
      case RequestStatus.EXPIRED:
        return DonationRequestStatusEnum.EXPIRED
      default:
        return DonationRequestStatusEnum.PENDING
    }
  }

  private getFirstName(fullName?: string): string {
    if (!fullName) {
      return "there"
    }

    return fullName.trim().split(/\s+/)[0]
  }

  private formatFacilityAddress(createdBy: any): string {
    const inlineCityState = [createdBy?.city, createdBy?.state].filter(Boolean).join(", ")
    const addressParts = [createdBy?.facilityAddress, createdBy?.address, createdBy?.location, inlineCityState].filter(Boolean)

    return addressParts.join(", ")
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  private abbreviateName(fullName?: string): string {
    if (!fullName) {
      return "Anonymous Donor"
    }

    const [firstName, lastName] = fullName.trim().split(/\s+/)
    if (!lastName) {
      return firstName
    }

    return `${firstName} ${lastName.charAt(0)}.`
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c * 10) / 10
  }
}
