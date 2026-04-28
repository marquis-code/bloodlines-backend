import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { DonationHistory } from "./donation-history.type"
import { DonationRequest } from "./donation-request.type"

export class DonorStatus {
  @ApiProperty({ example: "AVAILABLE" })
  availability: string

  @ApiProperty({ example: "A+" })
  bloodType: string

  @ApiProperty({ example: "2024-04-01" })
  nextEligibilityDate: Date

  @ApiPropertyOptional({ example: "2024-01-01" })
  lastDonationDate?: Date

  @ApiProperty({ example: "Sep 10, 2025" })
  nextEligibilityLabel: string

  @ApiProperty({ example: true })
  isEligibleNow: boolean
}

export class DonorImpact {
  @ApiProperty({ example: 5 })
  totalDonations: number

  @ApiProperty({ example: 15 })
  livesImpacted: number

  @ApiProperty({ example: 15 })
  livesPotentiallySaved: number

  @ApiProperty({ example: 2 })
  emergenciesHandled: number

  @ApiProperty({ example: 1 })
  newDonorsRecruited: number

  @ApiProperty({ example: 3 })
  level: number

  @ApiProperty({ example: "Level 3" })
  levelLabel: string

  @ApiProperty({ example: "Way to go lifesaver!" })
  message: string

  @ApiPropertyOptional({ example: 10 })
  nextLevelDonationTarget?: number
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

  @ApiProperty({ example: "🏆" })
  icon: string

  @ApiProperty({ example: "2024-01-01" })
  unlockedAt: Date

  @ApiProperty({ example: 1 })
  level: number

  @ApiProperty({ example: 1 })
  streakDays: number

  @ApiProperty({ example: true })
  unlocked: boolean
}

export class ProfileCompletion {
  @ApiProperty({ example: "Complete Your Profile" })
  title: string

  @ApiProperty({ example: 80 })
  percentComplete: number

  @ApiProperty({ type: [String], example: ["fullName", "email"] })
  completedFields: string[]

  @ApiProperty({ type: [String], example: ["genotype"] })
  remainingFields: string[]

  @ApiProperty({
    example: "Add your emergency contact and verify your location to help us match you with nearby requests.",
  })
  message: string

  @ApiProperty({ type: [String], example: ["Add your emergency contact", "Verify your location"] })
  nextSteps: string[]
}

export class DashboardHero {
  @ApiProperty({ example: "Welcome back, Abdul!" })
  title: string

  @ApiProperty({ example: "4 blood requests near you need your help" })
  subtitle: string

  @ApiProperty({ example: 4 })
  nearbyRequestsCount: number
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

  @ApiProperty({ type: DashboardHero })
  hero: DashboardHero

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
  reminderFrequency: string

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
