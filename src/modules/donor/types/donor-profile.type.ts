import { ObjectType, Field, Int } from "@nestjs/graphql"
import { DonationRequest } from "./donation-request.type"
import { DonationHistory } from "./donation-history.type"

@ObjectType()
export class DonorStatus {
  @Field()
  availability: string

  @Field()
  bloodType: string

  @Field()
  nextEligibilityDate: Date

  @Field()
  lastDonationDate?: Date
}

@ObjectType()
export class DonorImpact {
  @Field(() => Int)
  totalDonations: number

  @Field(() => Int)
  livesImpacted: number

  @Field(() => Int)
  emergenciesHandled: number

  @Field(() => Int)
  newDonorsRecruited: number
}

@ObjectType()
export class Achievement {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  badge: string

  @Field()
  unlockedAt: Date

  @Field(() => Int)
  level: number

  @Field(() => Int)
  streakDays: number
}

@ObjectType()
export class ProfileCompletion {
  @Field(() => Int)
  percentComplete: number

  @Field(() => [String])
  completedFields: string[]

  @Field(() => [String])
  remainingFields: string[]
}

@ObjectType()
export class DonorDashboard {
  @Field()
  welcomeMessage: string

  @Field(() => ProfileCompletion)
  profileCompletion: ProfileCompletion

  @Field(() => DonorStatus)
  donorStatus: DonorStatus

  @Field(() => DonorImpact)
  impact: DonorImpact

  @Field(() => [Achievement])
  achievements: Achievement[]

  @Field(() => [DonationRequest])
  nearbyBloodRequests: DonationRequest[]

  @Field(() => [DonationHistory])
  donationHistory: DonationHistory[]

  @Field(() => [CommunityActivity])
  communityActivity: CommunityActivity[]
}

@ObjectType()
export class CommunityActivity {
  @Field()
  id: string

  @Field()
  message: string

  @Field()
  actorName: string

  @Field()
  timestamp: Date

  @Field()
  icon: string
}

@ObjectType()
export class DonorProfile {
  @Field()
  id: string

  @Field()
  fullName: string

  @Field()
  email: string

  @Field()
  phone: string

  @Field()
  bloodType: string

  @Field({ nullable: true })
  genotype?: string

  @Field()
  gender: string

  @Field()
  latitude: number

  @Field()
  longitude: number

  @Field()
  availability: string

  @Field({ nullable: true })
  emergencyContact?: string

  @Field({ nullable: true })
  emergencyContactPhone?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
export class NotificationPreference {
  @Field()
  id: string

  @Field()
  userId: string

  @Field()
  emergencyAlerts: boolean

  @Field()
  donationReminders: boolean

  @Field()
  communityUpdates: boolean

  @Field()
  reminderFrequency: string // 'immediately', 'daily', 'weekly'

  @Field()
  updatedAt: Date
}

@ObjectType()
export class MedicalEligibility {
  @Field()
  isEligible: boolean

  @Field()
  nextEligibleDate: Date

  @Field({ nullable: true })
  reason?: string

  @Field()
  daysSinceLastDonation: number

  @Field()
  daysUntilEligible: number
}
