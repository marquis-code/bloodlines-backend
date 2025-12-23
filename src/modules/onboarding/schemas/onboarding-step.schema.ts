import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import type { HydratedDocument, Types } from "mongoose"

export type OnboardingStepDocument = HydratedDocument<OnboardingStep>

export enum OnboardingStepEnum {
  STEP_1 = "STEP_1",
  STEP_2 = "STEP_2",
  STEP_3 = "STEP_3",
  COMPLETED = "COMPLETED",
}

@Schema({ timestamps: true })
export class OnboardingStep {
  @Prop({ type: String, ref: "User", required: true })
  userId: Types.ObjectId

  @Prop({ type: String, enum: OnboardingStepEnum, default: OnboardingStepEnum.STEP_1 })
  currentStep: OnboardingStepEnum

  @Prop({ default: false })
  isCompleted: boolean

  @Prop()
  completedAt?: Date

  @Prop({ type: Object })
  stepData: {
    step1?: {
      fullName?: string
      gender?: string
      phoneNumber?: string
    }
    step2?: {
      email?: string
      bloodGroup?: string
      genotype?: string
      location?: string
      lastDonationDate?: Date
    }
    step3?: {
      password?: string
      agreedToDonate?: boolean
    }
  }
}

export const OnboardingStepSchema = SchemaFactory.createForClass(OnboardingStep)
