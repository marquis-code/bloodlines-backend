import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserRole } from "../../common/enums/role.enum"
import { DonorService } from "../donor/donor.service"
import { User } from "./schemas/user.schema"

@Injectable()
export class UserService {
  private readonly userProjection =
    "-password -emailVerificationToken -emailVerificationExpiry -passwordResetToken -passwordResetExpiry -__v"

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly donorService: DonorService,
  ) {}

  async getUserById(id: string, options?: { includeDashboard?: boolean }) {
    const user = await this.userModel.findById(id).select(this.userProjection).lean()
    if (!user) {
      throw new NotFoundException("User not found")
    }

    const response: any = {
      ...user,
      id: user._id.toString(),
    }

    if (options?.includeDashboard && user.role === UserRole.DONOR) {
      response.dashboard = await this.donorService.getDonorDashboard(id)
    }

    return response
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  async updateUser(id: string, updateData: Partial<User>) {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    return this.getUserById(id)
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    if (updateData.fullName) user.fullName = updateData.fullName
    if (updateData.phoneNumber) {
      const existingPhone = await this.userModel.findOne({
        phoneNumber: updateData.phoneNumber,
        _id: { $ne: userId },
      })
      if (existingPhone) {
        throw new BadRequestException("Phone number already in use")
      }
      user.phoneNumber = updateData.phoneNumber
    }
    if (updateData.location) user.location = updateData.location
    if (updateData.bloodGroup) user.bloodGroup = updateData.bloodGroup
    if (updateData.genotype !== undefined) user.genotype = updateData.genotype

    await user.save()
    return this.getUserById(userId)
  }

  async getAllUsers() {
    return this.userModel.find().select(this.userProjection).lean()
  }

  async getUsersByRole(role: string) {
    return this.userModel.find({ role }).select(this.userProjection).lean()
  }

  async incrementDonationCount(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, { $inc: { donationCount: 1 } }, { new: true })
  }
}
