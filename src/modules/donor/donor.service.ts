import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "../user/schemas/user.schema"
import { BloodRequest } from "../blood-request/schema/blood-request.schema"
import {
  DonationProgressStatusEnum,
  DonationProgressUpdate,
  DonationRequest,
} from "./types/donation-request.type"
import {
  DonorDashboard,
  DonorProfile,
  NotificationPreference,
  MedicalEligibility,
} from "./types/donor-profile.type"
import { ResourcesPage, ResourceCategoryEnum, type Resource } from "./types/resource.type"
import { DonationFeedback } from "./types/feedback.type"
import { AcceptRequestInput } from "./dto/accept-request.dto"
import { RejectRequestInput } from "./dto/reject-request.dto"
import { SubmitFeedbackInput } from "./dto/submit-feedback.dto"
import { UpdateProgressInput } from "./dto/update-progress.dto"
import { UpdateProfileInput } from "./dto/update-profile.dto"
import { UpdateAvailabilityInput } from "./dto/update-availability.dto"
import { UpdateNotificationPreferencesInput } from "./dto/update-notification-preferences.dto"
import { DonationHistory } from "./types/donation-history.type"
import { NotificationService } from "../notification/notification.service"

@Injectable()
export class DonorService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(BloodRequest.name) private bloodRequestModel: Model<BloodRequest>,
    private notificationService: NotificationService,
  ) {}

  // ============= DASHBOARD & PROFILE =============

  async getDonorDashboard(userId: string): Promise<DonorDashboard> {
    const user = await this.userModel.findById(userId)
    if (!user) throw new Error("User not found")

    const profileCompletion = this.calculateProfileCompletion(user)
    const donorStatus = this.getDonorStatus(user)
    const impact = await this.calculateDonorImpact(userId)
    const achievements = await this.getUserAchievements(userId)
    const nearbyRequests = await this.getNearbyBloodRequests(userId, 50)
    const donationHistory = await this.getDonationHistory(userId, 5)
    const communityActivity = await this.getCommunityActivity()

    return {
      welcomeMessage: `Welcome back, ${user.fullName}! 👋`,
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
    const user = await this.userModel.findById(userId)
    if (!user) throw new Error("User not found")

    // Extract coordinates from geoLocation if available
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
    const updateData: any = {}
    
    if (input.fullName) updateData.fullName = input.fullName
    if (input.phone) updateData.phoneNumber = input.phone
    if (input.bloodType) updateData.bloodGroup = input.bloodType
    if (input.genotype) updateData.genotype = input.genotype
    if (input.gender) updateData.gender = input.gender
    if (input.emergencyContact) updateData.emergencyContact = input.emergencyContact
    if (input.emergencyContactPhone) updateData.emergencyContactPhone = input.emergencyContactPhone
    
    // Update geoLocation if latitude and longitude are provided
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
    if (!user) throw new Error("User not found")

    return this.getDonorProfile(userId)
  }

  async updateAvailability(userId: string, input: UpdateAvailabilityInput): Promise<DonorProfile> {
    const isAvailable = input.status === "Available"
    const user = await this.userModel.findByIdAndUpdate(
      userId, 
      { isAvailable }, 
      { new: true }
    )
    if (!user) throw new Error("User not found")

    return this.getDonorProfile(userId)
  }

  // ============= NOTIFICATIONS & PREFERENCES =============
  // Note: You'll need to create NotificationPreference schema or store in User schema

  async getNotificationPreferences(userId: string): Promise<NotificationPreference> {
    // For now, return default preferences
    // TODO: Create NotificationPreference schema
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
    // TODO: Implement with NotificationPreference schema
    return this.getNotificationPreferences(userId)
  }

  // ============= BLOOD REQUESTS & DONATIONS =============

  async getNearbyBloodRequests(userId: string, radiusKm: number): Promise<DonationRequest[]> {
    const user = await this.userModel.findById(userId)
    if (!user) throw new Error("User not found")

    // Get user coordinates
    const userLat = user.geoLocation?.coordinates?.[1]
    const userLng = user.geoLocation?.coordinates?.[0]

    const requests = await this.bloodRequestModel
      .find({
        status: "PENDING",
        bloodType: user.bloodGroup, // Match donor's blood group
      })
      .populate("createdBy", "fullName facilityName")
      .limit(10)
      .lean()

    return requests.map((req: any) => {
      const reqLat = req.createdBy?.geoLocation?.coordinates?.[1] || 0
      const reqLng = req.createdBy?.geoLocation?.coordinates?.[0] || 0
      
      const distance = userLat && userLng 
        ? this.calculateDistance(userLat, userLng, reqLat, reqLng)
        : 0

      return {
        id: req._id.toString(),
        bloodType: req.bloodType,
        priority: req.priorityLevel,
        unitsNeeded: req.unitsNeeded,
        hospitalName: req.createdBy?.facilityName || "Unknown Hospital",
        address: req.createdBy?.facilityName || "",
        contactPhone: req.contactPhone || "",
        instructions: req.additionalNotes || "",
        createdAt: req.createdAt,
        status: DonationProgressStatusEnum.ACCEPTED,
        distance,
      }
    })
  }

  async getBloodRequestDetails(requestId: string): Promise<DonationRequest> {
    const request = await this.bloodRequestModel
      .findById(requestId)
      .populate("createdBy", "fullName facilityName contactPhone")
      .lean()
      
    if (!request) throw new Error("Request not found")

    const createdBy: any = request.createdBy

    return {
      id: request._id.toString(),
      bloodType: request.bloodType,
      priority: request.priorityLevel,
      unitsNeeded: request.unitsNeeded,
      hospitalName: createdBy?.facilityName || "Unknown Hospital",
      address: createdBy?.facilityName || "",
      contactPhone: request.contactPhone || "",
      instructions: request.additionalNotes || "",
      createdAt: request.createdAt,
      status: DonationProgressStatusEnum.ACCEPTED,
      distance: 0,
    }
  }

  async acceptBloodRequest(userId: string, input: AcceptRequestInput): Promise<DonationProgressUpdate> {
    const request = await this.bloodRequestModel.findById(input.requestId)
    if (!request) throw new Error("Request not found")

    // Add donor to assignedDonors array if not already there
    if (!request.assignedDonors) {
      request.assignedDonors = []
    }
    
    const userObjectId = userId as any
    if (!request.assignedDonors.some(id => id.toString() === userId)) {
      request.assignedDonors.push(userObjectId)
    }

    request.status = "ACCEPTED" as any
    await request.save()

    // Notify bridger via Email
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
    // You may want to track rejections in the future
    // For now, just acknowledge the rejection
  }

  async updateDonationProgress(userId: string, input: UpdateProgressInput): Promise<DonationProgressUpdate> {
    const request = await this.bloodRequestModel.findById(input.requestId)
    if (!request) throw new Error("Request not found")

    // Update request status based on progress
    if (input.status === DonationProgressStatusEnum.DONATION_COMPLETE) {
      request.status = "FULFILLED" as any
      request.unitsConfirmed += 1
      request.fulfillmentDate = new Date()
      
      // Update donor stats
      const donor = await this.userModel.findById(userId)
      if (donor) {
        donor.donationCount = (donor.donationCount || 0) + 1
        donor.lastDonationDate = new Date()
        await donor.save()
      }
    }

    await request.save()

    // Notify participants via Email if fulfilled
    if (input.status === DonationProgressStatusEnum.DONATION_COMPLETE && request.status === "FULFILLED" as any) {
      try {
        const donorIds = request.assignedDonors.map(id => id.toString())
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
    const history = await this.bloodRequestModel
      .find({ 
        assignedDonors: userId,
        status: { $in: ["FULFILLED", "ACCEPTED"] }
      })
      .populate("createdBy", "fullName facilityName contactPhone")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()

    return history.map((req: any) => {
      const createdBy = req.createdBy || {}
      return {
        id: req._id.toString(),
        hospitalName: createdBy.facilityName || "Unknown Hospital",
        bloodType: req.bloodType,
        unitsGiven: 1, // Assuming 1 unit per donation
        donatedAt: req.fulfillmentDate || req.createdAt,
        status: req.status,
        facilityName: createdBy.facilityName || "",
        facilityAddress: createdBy.facilityName || "",
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
      category === ResourceCategoryEnum.ALL ? allResources : allResources.filter((r) => r.category === category)

    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()),
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
    // TODO: Create Feedback schema to persist this
    return {
      id: new Date().getTime().toString(),
      requestId: input.requestId,
      rating: input.rating,
      comments: input.comments,
      submittedAt: new Date(),
    }
  }

  // ============= HELPER METHODS =============

  private calculateProfileCompletion(user: any): any {
    const fields = [
      "fullName", 
      "email", 
      "phoneNumber", 
      "bloodGroup", 
      "genotype", 
      "geoLocation", 
      "emergencyContact"
    ]
    const completed = fields.filter((field) => {
      const value = user[field]
      if (field === "geoLocation") {
        return value && value.coordinates && value.coordinates.length === 2
      }
      return value !== undefined && value !== null && value !== ""
    })
    const percent = Math.round((completed.length / fields.length) * 100)

    return {
      percentComplete: percent,
      completedFields: completed,
      remainingFields: fields.filter((f) => !completed.includes(f)),
    }
  }

  private getDonorStatus(user: any): any {
    return {
      availability: user.isAvailable ? "Available" : "Unavailable",
      bloodType: user.bloodGroup || "Unknown",
      nextEligibilityDate: this.calculateNextEligibilityDate(user),
      lastDonationDate: user.lastDonationDate,
    }
  }

  private calculateNextEligibilityDate(user: any): Date {
    const daysBetweenDonations = user.gender === "male" ? 56 : 112
    if (!user.lastDonationDate) return new Date() // Eligible now if never donated

    const nextDate = new Date(user.lastDonationDate)
    nextDate.setDate(nextDate.getDate() + daysBetweenDonations)
    return nextDate
  }

  async getMedicalEligibility(userId: string): Promise<MedicalEligibility> {
    const user = await this.userModel.findById(userId)
    if (!user) throw new Error("User not found")

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

  private async calculateDonorImpact(userId: string): Promise<any> {
    const donations = await this.bloodRequestModel.countDocuments({
      assignedDonors: userId,
      status: "FULFILLED",
    })

    return {
      totalDonations: donations,
      livesImpacted: donations * 3,
      emergenciesHandled: Math.floor(donations * 0.3),
      newDonorsRecruited: Math.floor(donations * 0.1),
    }
  }

  private async getUserAchievements(userId: string): Promise<any[]> {
    const donations = await this.bloodRequestModel.countDocuments({
      assignedDonors: userId,
      status: "FULFILLED",
    })

    const achievements = []

    if (donations >= 1) {
      achievements.push({
        id: "bronze",
        name: "Bronze Lifesaver",
        description: "5 donations completed",
        badge: "🥉",
        unlockedAt: new Date(),
        level: 1,
        streakDays: 0,
      })
    }

    if (donations >= 5) {
      achievements.push({
        id: "silver",
        name: "Silver Lifesaver",
        description: "10 donations completed",
        badge: "🥈",
        unlockedAt: new Date(),
        level: 2,
        streakDays: 0,
      })
    }

    return achievements
  }

  private async getCommunityActivity(): Promise<any[]> {
    return [
      {
        id: "1",
        message: "donated O+ blood at City General Hospital",
        actorName: "John A.",
        timestamp: new Date(),
        icon: "❤️",
      },
    ]
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c * 10) / 10
  }
}