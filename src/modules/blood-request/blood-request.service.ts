import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose" 
import { BloodRequest } from "./schema/blood-request.schema"
import { User } from "../user/schemas/user.schema"
import { UserRole } from "../../common/enums/role.enum"
import { RequestStatus } from "../../common/enums/request-status.enum"
import { CreateBloodRequestDto } from "./dtos/create-blood-request.dto"
import { UpdateBloodRequestDto } from "./dtos/update-blood-request.dto"

@Injectable()
export class BloodRequestService {
  constructor(
    @InjectModel(BloodRequest.name) private bloodRequestModel: Model<BloodRequest>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

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
      .find({ status: { $ne: RequestStatus.FULFILLED } })
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
      request.status = RequestStatus.FULFILLED
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