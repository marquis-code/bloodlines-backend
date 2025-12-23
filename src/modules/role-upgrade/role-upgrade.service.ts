import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose" 
import { RoleUpgradeRequest } from "./schemas/request-role-upgrade.schema"
import { User } from "../user/schemas/user.schema"
import { UserRole } from "../../common/enums/role.enum"
import { RequestRoleUpgradeDto } from "./dtos/request-role-upgrade.dto"

@Injectable()
export class RoleUpgradeService {
  constructor(
    @InjectModel(RoleUpgradeRequest.name) private roleUpgradeModel: Model<RoleUpgradeRequest>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async requestRoleUpgrade(userId: string, requestDto: RequestRoleUpgradeDto) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    // Check if user already has requested role
    if (user.role === requestDto.requestedRole) {
      throw new BadRequestException("You already have this role")
    }

    // Check if user has pending upgrade request
    const pendingRequest = await this.roleUpgradeModel.findOne({
      userId,
      status: "PENDING",
    })

    if (pendingRequest) {
      throw new BadRequestException("You already have a pending role upgrade request")
    }

    // Check donation count for Bridger role
    if (requestDto.requestedRole === UserRole.BRIDGER && user.donationCount < 1) {
      throw new BadRequestException("You need at least 1 successful donation to become a Bridger")
    }

    // Check donation count for Pulse Leader role
    if (requestDto.requestedRole === UserRole.PULSE_LEADER && user.donationCount < 5) {
      throw new BadRequestException("You need at least 5 successful donations to become a Pulse Leader")
    }

    const roleUpgradeRequest = new this.roleUpgradeModel({
      userId,
      ...requestDto,
    })

    return roleUpgradeRequest.save()
  }

  async getPendingRequests(limit = 10, skip = 0) {
    return this.roleUpgradeModel
      .find({ status: "PENDING" })
      .populate("userId", "fullName email donationCount facilityName")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
  }

  async approveUpgrade(requestId: string, adminId: string) {
    const request = await this.roleUpgradeModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Upgrade request not found")
    }

    const user = await this.userModel.findById(request.userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    user.role = request.requestedRole as UserRole
    user.facilityName = request.facilityName
    user.facilityAddress = request.facilityAddress
    await user.save()

    request.status = "APPROVED"
    request.reviewedBy = adminId as any
    request.reviewDate = new Date()
    await request.save()

    return { message: "Role upgrade approved successfully" }
  }

  async rejectUpgrade(requestId: string, adminId: string, rejectionReason: string) {
    const request = await this.roleUpgradeModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Upgrade request not found")
    }

    request.status = "REJECTED"
    request.reviewedBy = adminId as any
    request.reviewDate = new Date()
    request.rejectionReason = rejectionReason
    await request.save()

    return { message: "Role upgrade rejected successfully" }
  }

  async getUserUpgradeHistory(userId: string) {
    return this.roleUpgradeModel.find({ userId }).sort({ createdAt: -1 })
  }
}
