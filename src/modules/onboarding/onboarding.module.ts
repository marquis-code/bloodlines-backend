import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { OnboardingService } from "./onboarding.service"
import { OnboardingController } from "./onboarding.controller"
import { OnboardingStep, OnboardingStepSchema } from "./schemas/onboarding-step.schema"
import { User, UserSchema } from "../user/schemas/user.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OnboardingStep.name, schema: OnboardingStepSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [OnboardingService],
  controllers: [OnboardingController],
})
export class OnboardingModule { }

