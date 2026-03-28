import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { DonationRequest } from "./donation-request.type"
import { DonationHistory } from "./donation-history.type"

export class DonorStatus {
  @ApiProperty({ example: "AVAILABLE" })
  availability: string

  @ApiProperty({ example: "A+" })
  bloodType: string

  @ApiProperty({ example: "2024-04-01" })
  nextEligibilityDate: Date

  @ApiPropertyOptional({ example: "2024-01-01" })
  lastDonationDate?: Date
}

export class DonorImpact {
  @ApiProperty({ example: 5 })
  totalDonations: number

  @ApiProperty({ example: 15 })
  livesImpacted: number

  @ApiProperty({ example: 2 })
  emergenciesHandled: number

  @ApiProperty({ example: 1 })
  newDonorsRecruited: number
}

export class Achievement {
  @ApiProperty({ example: "ach_1" })
  id: string

  @ApiProperty({ example: "First Donation" })
  name: string

  @ApiProperty({ example: "You donated for the first time!" })
  description: string

  @ApiProperty({ example: "badge_icon_url" })
  badge: string

  @ApiProperty({ example: "2024-01-01" })
  unlockedAt: Date

  @ApiProperty({ example: 1 })
  level: number

  @ApiProperty({ example: 1 })
  streakDays: number
}

export class ProfileCompletion {
  @ApiProperty({ example: 80 })
  percentComplete: number

  @ApiProperty({ type: [String], example: ["fullName", "email"] })
  completedFields: string[]

  @ApiProperty({ type: [String], example: ["genotype"] })
  remainingFields: string[]
}

export class CommunityActivity {
  @ApiProperty({ example: "act_1" })
  id: string

  @ApiProperty({ example: "John donated A+ blood" })
  message: string

  @ApiProperty({ example: "John Doe" })
  actorName: string

  @ApiProperty({ example: "2024-02-21T10:00:00Z" })
  timestamp: Date

  @ApiProperty({ example: "blood_drop" })
  icon: string
}

export class DonorDashboard {
  @ApiProperty({ example: "Welcome back, John!" })
  welcomeMessage: string

  @ApiProperty({ type: ProfileCompletion })
  profileCompletion: ProfileCompletion

  @ApiProperty({ type: DonorStatus })
  donorStatus: DonorStatus

  @ApiProperty({ type: DonorImpact })
  impact: DonorImpact

  @ApiProperty({ type: [Achievement] })
  achievements: Achievement[]

  @ApiProperty({ type: [DonationRequest] })
  nearbyBloodRequests: DonationRequest[]

  @ApiProperty({ type: [DonationHistory] })
  donationHistory: DonationHistory[]

  @ApiProperty({ type: [CommunityActivity] })
  communityActivity: CommunityActivity[]
}

export class DonorProfile {
  @ApiProperty({ example: "donor_123" })
  id: string

  @ApiProperty({ example: "John Doe" })
  fullName: string

  @ApiProperty({ example: "john@example.com" })
  email: string

  @ApiProperty({ example: "+2348012345678" })
  phone: string

  @ApiProperty({ example: "A+" })
  bloodType: string

  @ApiPropertyOptional({ example: "AA" })
  genotype?: string

  @ApiProperty({ example: "Male" })
  gender: string

  @ApiProperty({ example: 6.5244 })
  latitude: number

  @ApiProperty({ example: 3.3792 })
  longitude: number

  @ApiProperty({ example: "AVAILABLE" })
  availability: string

  @ApiPropertyOptional({ example: "Jane Doe" })
  emergencyContact?: string

  @ApiPropertyOptional({ example: "+2348098765432" })
  emergencyContactPhone?: string

  @ApiProperty({ example: "2024-01-01" })
  createdAt: Date

  @ApiProperty({ example: "2024-01-01" })
  updatedAt: Date
}

export class NotificationPreference {
  @ApiProperty({ example: "pref_123" })
  id: string

  @ApiProperty({ example: "user_123" })
  userId: string

  @ApiProperty({ example: true })
  emergencyAlerts: boolean

  @ApiProperty({ example: true })
  donationReminders: boolean

  @ApiProperty({ example: false })
  communityUpdates: boolean

  @ApiProperty({ example: "daily" })
  reminderFrequency: string // 'immediately', 'daily', 'weekly'

  @ApiProperty({ example: "2024-01-01" })
  updatedAt: Date
}

export class MedicalEligibility {
  @ApiProperty({ example: true })
  isEligible: boolean

  @ApiProperty({ example: "2024-04-01" })
  nextEligibleDate: Date

  @ApiPropertyOptional({ example: "Too soon after last donation" })
  reason?: string

  @ApiProperty({ example: 30 })
  daysSinceLastDonation: number

  @ApiProperty({ example: 60 })
  daysUntilEligible: number
}

