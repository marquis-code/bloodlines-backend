import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose" 
import { User } from "./schemas/user.schema"

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  async updateUser(id: string, updateData: Partial<User>) {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true })
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    // Update allowed fields only
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

    return user.save()
  }

  async getAllUsers() {
    return this.userModel.find()
  }

  async getUsersByRole(role: string) {
    return this.userModel.find({ role })
  }

  async incrementDonationCount(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, { $inc: { donationCount: 1 } }, { new: true })
  }
}
