import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { BloodRequest } from "../blood-request/schema/blood-request.schema"
import { User } from "../user/schemas/user.schema"
import { SearchDonorsFilterDto } from "./dto/search-donors.dto"
import { BroadcastMessageDto } from "./dto/broadcast-message.dto"
import { NotificationGateway } from "../notification/notification.gateway"

@Injectable()
export class PulseLeaderService {
  constructor(
    @InjectModel(BloodRequest.name) private bloodRequestModel: Model<BloodRequest>,
    @InjectModel(User.name) private userModel: Model<User>,
    private notificationGateway: NotificationGateway,
  ) {}

  // Dashboard Statistics
  async getDashboardStatistics(pulseLeaderId: string) {
    const currentMonth = new Date()
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    const [activeDonors, escalations, donations, emergencies, responseTime] = await Promise.all([
      this.userModel.countDocuments({
        isAvailable: true,
        role: "DONOR",
        geoLocation: { $exists: true },
      }),

      this.bloodRequestModel.countDocuments({
        donorResponseStatus: "ESCALATED",
        createdAt: { $gte: monthStart, $lte: monthEnd },
      }),

      this.bloodRequestModel.countDocuments({
        status: "FULFILLED",
        createdAt: { $gte: monthStart, $lte: monthEnd },
      }),

      this.bloodRequestModel.countDocuments({
        priorityLevel: "CRITICAL",
        createdAt: { $gte: monthStart, $lte: monthEnd },
      }),

      this.calculateAverageResponseTime(monthStart, monthEnd),
    ])

    const escalationRate = escalations > 0 ? (donations / escalations) * 100 : 0

    return {
      activeDonors,
      avgResponseTime: responseTime,
      escalationFulfillmentRate: escalationRate,
      totalRequests: escalations,
      totalDonations: donations,
      newDonorsRecruited: 8, // Placeholder - would be calculated
      emergenciesHandled: emergencies,
    }
  }

  private async calculateAverageResponseTime(startDate: Date, endDate: Date): Promise<string> {
    const requests = await this.bloodRequestModel
      .find({
        createdAt: { $gte: startDate, $lte: endDate },
        assignedDonors: { $exists: true, $ne: [] },
      })
      .select("createdAt updatedAt")
      .lean()

    if (requests.length === 0) return "0m 0s"

    const totalMs = requests.reduce((acc, req) => {
      const createdTime = new Date(req.createdAt).getTime()
      const acceptedTime = new Date(req.updatedAt).getTime()
      return acc + (acceptedTime - createdTime)
    }, 0)

    const avgMs = Math.floor(totalMs / requests.length)
    const minutes = Math.floor(avgMs / 60000)
    const seconds = Math.floor((avgMs % 60000) / 1000)

    return `${minutes}m ${seconds}s`
  }

  // Monthly Coordination Metrics
  async getMonthlyMetrics(pulseLeaderId: string, month?: Date) {
    const targetMonth = month || new Date()
    const startDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1)
    const endDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0)

    const metrics = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dayStart = new Date(currentDate)
      const dayEnd = new Date(currentDate)
      dayEnd.setHours(23, 59, 59, 999)

      const [donations, requests] = await Promise.all([
        this.bloodRequestModel.countDocuments({
          status: "FULFILLED",
          createdAt: { $gte: dayStart, $lte: dayEnd },
        }),
        this.bloodRequestModel.countDocuments({
          createdAt: { $gte: dayStart, $lte: dayEnd },
        }),
      ])

      metrics.push({
        month: currentDate.toLocaleDateString("en-US", { month: "short" }),
        donations,
        requests,
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return metrics
  }

  // Search Donors with Filters
  async searchDonors(filters: SearchDonorsFilterDto, pulseLeaderId: string) {
    const query: any = { role: "DONOR" }

    if (filters.bloodType) {
      query.bloodGroup = filters.bloodType
    }

    if (filters.availability) {
      query.isAvailable = filters.availability === "Available"
    }

    if (filters.coordinates && filters.radiusKm) {
      query.geoLocation = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: filters.coordinates,
          },
          $maxDistance: filters.radiusKm * 1000, // Convert to meters
        },
      }
    }

    const skip = filters.skip || 0
    const limit = filters.limit || 20

    const donors = await this.userModel
      .find(query)
      .select("_id fullName bloodGroup genotype geoLocation lastDonationDate isAvailable phoneNumber email")
      .skip(skip)
      .limit(limit)
      .lean()

    return donors.map((donor: any) => ({
      id: donor._id.toString(),
      name: donor.fullName,
      bloodType: donor.bloodGroup || "Unknown",
      genotype: donor.genotype || "N/A",
      distanceKm: this.calculateDistance(filters.coordinates, donor.geoLocation?.coordinates),
      lastDonatedDate: donor.lastDonationDate 
        ? new Date(donor.lastDonationDate).toLocaleDateString() 
        : "Never",
      availability: donor.isAvailable ? "Available" : "Unavailable",
      phone: donor.phoneNumber || "N/A",
      email: donor.email,
    }))
  }

  private calculateDistance(coords1?: [number, number], coords2?: [number, number]): number {
    if (!coords1 || !coords2) return 0

    const [lon1, lat1] = coords1
    const [lon2, lat2] = coords2

    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return Math.round(R * c * 10) / 10
  }

  // Broadcast Message
  async broadcastMessage(broadcastDto: BroadcastMessageDto, pulseLeaderId: string) {
    const request = await this.bloodRequestModel.findById(broadcastDto.requestId).lean()
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    // Find recipient donors based on filters
    let recipients = []

    if (broadcastDto.recipientDonorIds?.length > 0) {
      recipients = await this.userModel.find({
        _id: { $in: broadcastDto.recipientDonorIds },
        role: "DONOR",
      }).lean()
    } else {
      const query: any = { role: "DONOR" }

      if (broadcastDto.bloodType) {
        query.bloodGroup = broadcastDto.bloodType
      }

      if (broadcastDto.coordinates && broadcastDto.radiusKm) {
        query.geoLocation = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: broadcastDto.coordinates,
            },
            $maxDistance: broadcastDto.radiusKm * 1000,
          },
        }
      }

      recipients = await this.userModel.find(query).select("_id phoneNumber email").lean()
    }

    // Send broadcast via WebSocket and optionally SMS/Push
    const broadcastMessage = {
      id: `msg_${Date.now()}`,
      requestId: broadcastDto.requestId,
      pulseLeaderId,
      messageContent: broadcastDto.messageContent,
      deliveryStatus: "sent",
      sentAt: new Date().toISOString(),
      recipientCount: recipients.length,
      deliveredCount: 0,
      readCount: 0,
    }

    // Emit via WebSocket for real-time delivery
    // Note: Using broadcastBloodRequest instead of non-existent broadcastDonationAlert
    recipients.forEach((recipient: any) => {
      this.notificationGateway.broadcastBloodRequest(
        {
          type: "BROADCAST_ALERT",
          requestId: broadcastDto.requestId,
          bloodType: request.bloodType,
          unitsNeeded: request.unitsNeeded,
          priorityLevel: request.priorityLevel,
          message: broadcastDto.messageContent,
        },
        recipient._id.toString()
      )
    })

    // TODO: Integrate SMS delivery via Twilio if broadcastMethod includes 'SMS'
    // TODO: Integrate Push notifications if broadcastMethod includes 'PUSH'

    return broadcastMessage
  }

  // Get Escalation History
  async getEscalationHistory(pulseLeaderId: string, limit = 5) {
    const escalations = await this.bloodRequestModel
      .find({ donorResponseStatus: "ESCALATED" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("bloodType priorityLevel createdAt status unitsConfirmed")
      .lean()

    return escalations.map((esc: any) => ({
      id: esc._id.toString(),
      bloodType: esc.bloodType,
      urgency: esc.priorityLevel,
      posted: new Date(esc.createdAt).toISOString(),
      outcome: esc.status === "FULFILLED" ? "Fulfilled" : "Pending",
      donorsResponded: esc.unitsConfirmed || 0,
    }))
  }

  // Get Recent Activities
  async getRecentActivities(pulseLeaderId: string, limit = 10) {
    const activities = await this.bloodRequestModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("createdBy", "fullName")
      .select("bloodType unitsNeeded status createdAt")
      .lean()

    return activities.map((activity: any) => ({
      id: activity._id.toString(),
      activityType: "BLOOD_REQUEST",
      description:
        activity.status === "FULFILLED"
          ? `Coordinated ${activity.unitsNeeded} units of ${activity.bloodType}`
          : `Posted request for ${activity.unitsNeeded} units of ${activity.bloodType}`,
      actor: activity.createdBy?.fullName || "Unknown",
      timestamp: new Date(activity.createdAt).toISOString(),
      bloodType: activity.bloodType,
      units: activity.unitsNeeded,
    }))
  }

  // Get Request Fulfillment Breakdown
  async getRequestFulfillmentBreakdown(pulseLeaderId: string, filterBy: "bloodType" | "urgency" = "bloodType") {
    const requests = await this.bloodRequestModel.find({}).lean()

    const grouped = requests.reduce(
      (acc, req: any) => {
        const key = filterBy === "bloodType" ? req.bloodType : req.priorityLevel
        if (!acc[key]) {
          acc[key] = { total: 0, fulfilled: 0 }
        }
        acc[key].total++
        if (req.status === "FULFILLED") {
          acc[key].fulfilled++
        }
        return acc
      },
      {} as Record<string, { total: number; fulfilled: number }>,
    )

    return Object.entries(grouped).map(([label, data]) => ({
      label,
      value: data.total > 0 ? (data.fulfilled / data.total) * 100 : 0,
      status: data.fulfilled / data.total > 0.8 ? "Good" : data.fulfilled / data.total > 0.5 ? "Fair" : "Critical",
    }))
  }

  // Full Dashboard
  async getPulseLeaderDashboard(pulseLeaderId: string) {
    const [statistics, monthlyMetrics, recentRequests, activities, fulfillmentByBlood, fulfillmentByUrgency] =
      await Promise.all([
        this.getDashboardStatistics(pulseLeaderId),
        this.getMonthlyMetrics(pulseLeaderId),
        this.bloodRequestModel
          .find({ status: { $in: ["PENDING", "ACCEPTED"] } })
          .limit(5)
          .sort({ createdAt: -1 })
          .lean(),
        this.getRecentActivities(pulseLeaderId),
        this.getRequestFulfillmentBreakdown(pulseLeaderId, "bloodType"),
        this.getRequestFulfillmentBreakdown(pulseLeaderId, "urgency"),
      ])

    return {
      statistics,
      monthlyMetrics,
      recentBloodRequests: recentRequests,
      recentActivities: activities,
      requestFulfillmentByBloodType: fulfillmentByBlood,
      requestFulfillmentByUrgency: fulfillmentByUrgency,
    }
  }
}