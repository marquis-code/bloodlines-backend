import { Resolver, Mutation, Query } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { OnboardingService } from "./onboarding.service"
import { OnboardingStep1Dto, OnboardingStep2Dto, CompleteOnboardingDto } from "./dtos/onboarding.dto"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"

@Resolver()
export class OnboardingResolver {
  constructor(private onboardingService: OnboardingService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async initializeOnboarding(user: any) {
    const result = await this.onboardingService.initializeOnboarding(user.userId)
    return JSON.stringify(result)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async submitStep1(user: any, step1Data: OnboardingStep1Dto) {
    const result = await this.onboardingService.submitStep1(user.userId, step1Data)
    return JSON.stringify(result)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async submitStep2(user: any, step2Data: OnboardingStep2Dto) {
    const result = await this.onboardingService.submitStep2(user.userId, step2Data)
    return JSON.stringify(result)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async completeOnboarding(user: any, step3Data: CompleteOnboardingDto) {
    const result = await this.onboardingService.completeOnboarding(user.userId, step3Data)
    return JSON.stringify(result)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => String)
  async getOnboardingStatus(user: any) {
    const result = await this.onboardingService.getOnboardingStatus(user.userId)
    return JSON.stringify(result)
  }
}
