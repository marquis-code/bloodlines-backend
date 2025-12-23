import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import * as bcrypt from "bcrypt"
import { OnboardingStep, OnboardingStepEnum } from "./schemas/onboarding-step.schema"
import { User } from "../user/schemas/user.schema"
import { OnboardingStep1Dto } from "./dtos/onboarding.dto"
import { OnboardingStep2Dto } from "./dtos/onboarding.dto"
import { CompleteOnboardingDto } from "./dtos/onboarding.dto"

@Injectable()
export class OnboardingService {
  constructor(
    @InjectModel(OnboardingStep.name) private onboardingModel: Model<OnboardingStep>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async initializeOnboarding(userId: Types.ObjectId) {
    const existingOnboarding = await this.onboardingModel.findOne({ userId })
    if (existingOnboarding) {
      return existingOnboarding
    }

    const onboarding = new this.onboardingModel({
      userId,
      currentStep: OnboardingStepEnum.STEP_1,
      stepData: {
        step1: {},
        step2: {},
        step3: {},
      },
    })

    return onboarding.save()
  }

  async submitStep1(userId: Types.ObjectId, step1Data: OnboardingStep1Dto) {
    const onboarding = await this.onboardingModel.findOne({ userId })
    if (!onboarding) {
      throw new NotFoundException("Onboarding not found")
    }

    onboarding.stepData.step1 = step1Data
    onboarding.currentStep = OnboardingStepEnum.STEP_2

    // Update user with step 1 data
    await this.userModel.findByIdAndUpdate(userId, {
      fullName: step1Data.fullName,
      gender: step1Data.gender,
      phoneNumber: step1Data.phoneNumber,
    })

    return onboarding.save()
  }

  async submitStep2(userId: Types.ObjectId, step2Data: OnboardingStep2Dto) {
    const onboarding = await this.onboardingModel.findOne({ userId })
    if (!onboarding) {
      throw new NotFoundException("Onboarding not found")
    }

    // Convert string date to Date object before assigning
    onboarding.stepData.step2 = {
      email: step2Data.email,
      bloodGroup: step2Data.bloodGroup,
      genotype: step2Data.genotype,
      location: step2Data.location,
      lastDonationDate: step2Data.lastDonationDate ? new Date(step2Data.lastDonationDate) : undefined,
    }
    onboarding.currentStep = OnboardingStepEnum.STEP_3

    // Update user with step 2 data
    await this.userModel.findByIdAndUpdate(userId, {
      email: step2Data.email,
      bloodGroup: step2Data.bloodGroup,
      genotype: step2Data.genotype,
      location: step2Data.location,
      lastDonationDate: step2Data.lastDonationDate ? new Date(step2Data.lastDonationDate) : undefined,
    })

    return onboarding.save()
  }

  async completeOnboarding(userId: Types.ObjectId, step3Data: CompleteOnboardingDto) {
    const onboarding = await this.onboardingModel.findOne({ userId })
    if (!onboarding) {
      throw new NotFoundException("Onboarding not found")
    }

    if (step3Data.password !== step3Data.confirmPassword) {
      throw new BadRequestException("Passwords do not match")
    }

    const hashedPassword = await bcrypt.hash(step3Data.password, 10)

    onboarding.stepData.step3 = {
      password: "***",
      agreedToDonate: true,
    }
    onboarding.currentStep = OnboardingStepEnum.COMPLETED
    onboarding.isCompleted = true
    onboarding.completedAt = new Date()

    // Update user with password and completion
    await this.userModel.findByIdAndUpdate(userId, {
      password: hashedPassword,
      agreedToDonate: true,
      isActive: true,
    })

    return onboarding.save()
  }

  async getOnboardingStatus(userId: Types.ObjectId) {
    const onboarding = await this.onboardingModel.findOne({ userId })
    if (!onboarding) {
      throw new NotFoundException("Onboarding not found")
    }
    return onboarding
  }
}