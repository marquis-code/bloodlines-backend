import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { OnboardingService } from "./onboarding.service"
import { OnboardingStep1Dto, OnboardingStep2Dto, CompleteOnboardingDto } from "./dtos/onboarding.dto"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@ApiTags("Onboarding")
@ApiBearerAuth()
@Controller("onboarding")
@UseGuards(JwtAuthGuard)
export class OnboardingController {

    constructor(private onboardingService: OnboardingService) { }

    @Post("initialize")
    async initializeOnboarding(@CurrentUser() user: any) {
        return this.onboardingService.initializeOnboarding(user.userId)
    }

    @Post("step1")
    async submitStep1(@CurrentUser() user: any, @Body() step1Data: OnboardingStep1Dto) {
        return this.onboardingService.submitStep1(user.userId, step1Data)
    }

    @Post("step2")
    async submitStep2(@CurrentUser() user: any, @Body() step2Data: OnboardingStep2Dto) {
        return this.onboardingService.submitStep2(user.userId, step2Data)
    }

    @Post("complete")
    async completeOnboarding(@CurrentUser() user: any, @Body() step3Data: CompleteOnboardingDto) {
        return this.onboardingService.completeOnboarding(user.userId, step3Data)
    }

    @Get("status")
    async getOnboardingStatus(@CurrentUser() user: any) {
        return this.onboardingService.getOnboardingStatus(user.userId)
    }
}
