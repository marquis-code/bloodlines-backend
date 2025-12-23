import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common"
import type { Model } from "mongoose"
import type { BloodRequest } from "./schemas/blood-request.schema"
import type { User } from "../user/schemas/user.schema"
import { UserRole } from "../../common/enums/role.enum"
import type { CreateBloodRequestDto } from "./dtos/create-blood-request.dto"
import type { UpdateBloodRequestDto } from "./dtos/update-blood-request.dto"

@Injectable()
export class BloodRequestService {
  private bloodRequestModel: Model<BloodRequest>
  private userModel: Model<User>

  constructor(bloodRequestModel: Model<BloodRequest>, userModel: Model<User>) {
    this.bloodRequestModel = bloodRequestModel
    this.userModel = userModel
  }

  async createBloodRequest(userId: string, createDto: CreateBloodRequestDto) {
    const user = await this.userModel.findById(userId)
    if (!user || user.role !== UserRole.BRIDGER) {
      throw new ForbiddenException("Only Bridgers can create blood requests")
    }

    const bloodRequest = new this.bloodRequestModel({
      ...createDto,
      createdBy: userId,
    })

    return bloodRequest.save()
  }

  async getActiveRequests(limit = 10, skip = 0) {
    return this.bloodRequestModel
      .find({ status: { $ne: "FULFILLED" } })
      .populate("createdBy", "fullName email facilityName")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
  }

  async getRequestsByUser(userId: string, limit = 10, skip = 0) {
    return this.bloodRequestModel.find({ createdBy: userId }).sort({ createdAt: -1 }).limit(limit).skip(skip)
  }

  async confirmDonation(requestId: string, userId: string) {
    const request = await this.bloodRequestModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    request.unitsConfirmed += 1
    if (request.unitsConfirmed >= request.unitsNeeded) {
      request.status = "FULFILLED"
      request.fulfillmentDate = new Date()
    }

    return request.save()
  }

  async updateRequest(requestId: string, userId: string, updateDto: UpdateBloodRequestDto) {
    const request = await this.bloodRequestModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    if (request.createdBy.toString() !== userId) {
      throw new ForbiddenException("You can only update your own requests")
    }

    Object.assign(request, updateDto)
    return request.save()
  }

  async getAllRequests(limit = 10, skip = 0) {
    return this.bloodRequestModel
      .find()
      .populate("createdBy", "fullName email facilityName")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
  }
}
