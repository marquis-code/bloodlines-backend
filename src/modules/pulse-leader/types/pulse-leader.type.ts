import { ObjectType, Field, Int, Float } from "@nestjs/graphql"
import { BloodRequestType } from "../../blood-request/types/blood-request.type"

@ObjectType()
export class DashboardStatisticsType {
  @Field(() => Int)
  activeDonors: number

  @Field()
  avgResponseTime: string

  @Field(() => Float)
  escalationFulfillmentRate: number

  @Field(() => Int)
  totalRequests: number

  @Field(() => Int)
  totalDonations: number

  @Field(() => Int)
  newDonorsRecruited: number

  @Field(() => Int)
  emergenciesHandled: number
}

@ObjectType()
export class MonthlyCoordinationMetricsType {
  @Field()
  month: string

  @Field(() => Int)
  donations: number

  @Field(() => Int)
  requests: number
}

@ObjectType()
export class EscalationHistoryType {
  @Field()
  id: string

  @Field()
  bloodType: string

  @Field()
  urgency: string

  @Field()
  posted: string

  @Field()
  outcome: string

  @Field(() => Int)
  donorsResponded: number
}

@ObjectType()
export class DonorSearchResultType {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  bloodType: string

  @Field()
  genotype: string

  @Field(() => Float)
  distanceKm: number

  @Field()
  lastDonatedDate: string

  @Field()
  availability: string

  @Field()
  phone: string

  @Field()
  email: string
}

@ObjectType()
export class BroadcastMessageType {
  @Field()
  id: string

  @Field()
  requestId: string

  @Field()
  pulseLeaderId: string

  @Field()
  messageContent: string

  @Field()
  deliveryStatus: string

  @Field()
  sentAt: string

  @Field(() => Int)
  recipientCount: number

  @Field(() => Int)
  deliveredCount: number

  @Field(() => Int)
  readCount: number
}

@ObjectType()
export class RecentActivityType {
  @Field()
  id: string

  @Field()
  activityType: string

  @Field()
  description: string

  @Field()
  actor: string

  @Field()
  timestamp: string

  @Field()
  bloodType: string

  @Field()
  units: number
}

@ObjectType()
export class AnalyticsBreakdownType {
  @Field()
  label: string

  @Field(() => Float)
  value: number

  @Field()
  status: string
}

@ObjectType()
export class PulseLeaderDashboardType {
  @Field()
  statistics: DashboardStatisticsType

  @Field(() => [MonthlyCoordinationMetricsType])
  monthlyMetrics: MonthlyCoordinationMetricsType[]

  @Field(() => [BloodRequestType])
  recentBloodRequests: BloodRequestType[]

  @Field(() => [RecentActivityType])
  recentActivities: RecentActivityType[]

  @Field(() => [AnalyticsBreakdownType])
  requestFulfillmentByBloodType: AnalyticsBreakdownType[]

  @Field(() => [AnalyticsBreakdownType])
  requestFulfillmentByUrgency: AnalyticsBreakdownType[]
}
