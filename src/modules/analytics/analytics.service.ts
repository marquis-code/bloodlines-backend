import { Injectable } from "@nestjs/common"
import type { Model } from "mongoose"
import { BloodType } from "../../common/enums/blood-type.enum"
import { PriorityLevel } from "../../common/enums/priority-level.enum"

@Injectable()
export class AnalyticsService {
  private bloodRequestModel: Model<any>
  private userModel: Model<any>

  constructor(bloodRequestModel: Model<any>, userModel: Model<any>) {
    this.bloodRequestModel = bloodRequestModel
    this.userModel = userModel
  }

  async getTotalRequests() {
    return this.bloodRequestModel.countDocuments()
  }

  async getBloodInventory() {
    const inventory = {}
    for (const bloodType of Object.values(BloodType)) {
      const count = await this.bloodRequestModel.countDocuments({
        bloodType,
        status: { $ne: "FULFILLED" },
      })
      inventory[bloodType] = count
    }
    return inventory
  }

  async getRequestsFulfillmentByBloodType() {
    const bloodTypes = Object.values(BloodType)
    const data = []

    for (const bloodType of bloodTypes) {
      const total = await this.bloodRequestModel.countDocuments({ bloodType })
      const fulfilled = await this.bloodRequestModel.countDocuments({
        bloodType,
        status: "FULFILLED",
      })

      const percentage = total > 0 ? Math.round((fulfilled / total) * 100) : 0

      data.push({
        bloodType,
        percentage,
        total,
        fulfilled,
      })
    }

    return data
  }

  async getRequestsFulfillmentByUrgency() {
    const urgencyLevels = Object.values(PriorityLevel)
    const data = []

    for (const level of urgencyLevels) {
      const total = await this.bloodRequestModel.countDocuments({
        priorityLevel: level,
      })
      const fulfilled = await this.bloodRequestModel.countDocuments({
        priorityLevel: level,
        status: "FULFILLED",
      })

      const percentage = total > 0 ? Math.round((fulfilled / total) * 100) : 0

      data.push({
        urgency: level,
        percentage,
        total,
        fulfilled,
      })
    }

    return data
  }

  async getAverageResponseTime() {
    const requests = await this.bloodRequestModel.find({ fulfillmentDate: { $exists: true } }).lean()

    if (requests.length === 0) return "0m"

    const totalMinutes = requests.reduce((sum, req) => {
      const createdTime = new Date(req.createdAt).getTime()
      const fulfillmentTime = new Date(req.fulfillmentDate).getTime()
      const diffMinutes = Math.floor((fulfillmentTime - createdTime) / (1000 * 60))
      return sum + diffMinutes
    }, 0)

    const avgMinutes = Math.floor(totalMinutes / requests.length)
    const hours = Math.floor(avgMinutes / 60)
    const minutes = avgMinutes % 60

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  async getDonorResponseStats() {
    const total = await this.bloodRequestModel.countDocuments()

    const accepted = await this.bloodRequestModel.countDocuments({
      donorResponseStatus: "ACCEPTED",
    })

    const escalated = await this.bloodRequestModel.countDocuments({
      donorResponseStatus: "ESCALATED",
    })

    const noResponse = total - accepted - escalated

    return {
      total,
      accepted: {
        count: accepted,
        percentage: total > 0 ? Math.round((accepted / total) * 100) : 0,
      },
      escalated: {
        count: escalated,
        percentage: total > 0 ? Math.round((escalated / total) * 100) : 0,
      },
      noResponse: {
        count: noResponse,
        percentage: total > 0 ? Math.round((noResponse / total) * 100) : 0,
      },
    }
  }

  async getTopBridgers(limit = 10) {
    const bridgers = await this.bloodRequestModel.aggregate([
      {
        $match: { status: "FULFILLED" },
      },
      {
        $group: {
          _id: "$createdBy",
          requestCount: { $sum: 1 },
          totalUnitsConfirmed: { $sum: "$unitsConfirmed" },
        },
      },
      {
        $sort: { requestCount: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: "$_id",
          name: "$user.fullName",
          facilityName: "$user.facilityName",
          requestCount: 1,
          totalUnitsConfirmed: 1,
        },
      },
    ])

    return bridgers
  }

  async getRequestFulfillmentTimeSeries(months = 6) {
    const monthsAgo = new Date()
    monthsAgo.setMonth(monthsAgo.getMonth() - months)

    const data = await this.bloodRequestModel.aggregate([
      {
        $match: {
          createdAt: { $gte: monthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ])

    return data.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      count: item.count,
    }))
  }
}
