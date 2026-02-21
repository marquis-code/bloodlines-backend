import { ApiProperty } from "@nestjs/swagger"
import { BloodRequestType } from "../../blood-request/types/blood-request.type"

export class DashboardStatisticsType {
  @ApiProperty({ example: 120 })
  activeDonors: number

  @ApiProperty({ example: "12 mins" })
  avgResponseTime: string

  @ApiProperty({ example: 0.85 })
  escalationFulfillmentRate: number

  @ApiProperty({ example: 450 })
  totalRequests: number

  @ApiProperty({ example: 380 })
  totalDonations: number

  @ApiProperty({ example: 25 })
  newDonorsRecruited: number

  @ApiProperty({ example: 60 })
  emergenciesHandled: number
}

export class MonthlyCoordinationMetricsType {
  @ApiProperty({ example: "Feb" })
  month: string

  @ApiProperty({ example: 15 })
  donations: number

  @ApiProperty({ example: 20 })
  requests: number
}

export class EscalationHistoryType {
  @ApiProperty({ example: "esc_123" })
  id: string

  @ApiProperty({ example: "O-" })
  bloodType: string

  @ApiProperty({ example: "CRITICAL" })
  urgency: string

  @ApiProperty({ example: "2 hours ago" })
  posted: string

  @ApiProperty({ example: "FULFILLED" })
  outcome: string

  @ApiProperty({ example: 5 })
  donorsResponded: number
}

export class DonorSearchResultType {
  @ApiProperty({ example: "donor_123" })
  id: string

  @ApiProperty({ example: "John Doe" })
  name: string

  @ApiProperty({ example: "A+" })
  bloodType: string

  @ApiProperty({ example: "AA" })
  genotype: string

  @ApiProperty({ example: 5.2 })
  distanceKm: number

  @ApiProperty({ example: "2024-01-15" })
  lastDonatedDate: string

  @ApiProperty({ example: "AVAILABLE" })
  availability: string

  @ApiProperty({ example: "+2348012345678" })
  phone: string

  @ApiProperty({ example: "john@example.com" })
  email: string
}

export class BroadcastMessageType {
  @ApiProperty({ example: "bc_123" })
  id: string

  @ApiProperty({ example: "req_123" })
  requestId: string

  @ApiProperty({ example: "pulse_123" })
  pulseLeaderId: string

  @ApiProperty({ example: "Urgent need for O- blood" })
  messageContent: string

  @ApiProperty({ example: "DELIVERED" })
  deliveryStatus: string

  @ApiProperty({ example: "2024-02-21T10:00:00Z" })
  sentAt: string

  @ApiProperty({ example: 10 })
  recipientCount: number

  @ApiProperty({ example: 10 })
  deliveredCount: number

  @ApiProperty({ example: 5 })
  readCount: number
}

export class RecentActivityType {
  @ApiProperty({ example: "act_1" })
  id: string

  @ApiProperty({ example: "BLOOD_REQUEST" })
  activityType: string

  @ApiProperty({ example: "New blood request posted" })
  description: string

  @ApiProperty({ example: "Hospital Admin" })
  actor: string

  @ApiProperty({ example: "2024-02-21T11:00:00Z" })
  timestamp: string

  @ApiProperty({ example: "B+" })
  bloodType: string

  @ApiProperty({ example: 2 })
  units: number
}

export class AnalyticsBreakdownType {
  @ApiProperty({ example: "A+" })
  label: string

  @ApiProperty({ example: 0.75 })
  value: number

  @ApiProperty({ example: "GOOD" })
  status: string
}

export class PulseLeaderDashboardType {
  @ApiProperty({ type: DashboardStatisticsType })
  statistics: DashboardStatisticsType

  @ApiProperty({ type: [MonthlyCoordinationMetricsType] })
  monthlyMetrics: MonthlyCoordinationMetricsType[]

  @ApiProperty({ type: [BloodRequestType] })
  recentBloodRequests: BloodRequestType[]

  @ApiProperty({ type: [RecentActivityType] })
  recentActivities: RecentActivityType[]

  @ApiProperty({ type: [AnalyticsBreakdownType] })
  requestFulfillmentByBloodType: AnalyticsBreakdownType[]

  @ApiProperty({ type: [AnalyticsBreakdownType] })
  requestFulfillmentByUrgency: AnalyticsBreakdownType[]
}

