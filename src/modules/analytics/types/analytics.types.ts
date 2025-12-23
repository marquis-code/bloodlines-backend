import { ObjectType, Field, Float, Int } from "@nestjs/graphql"

@ObjectType()
export class BloodInventoryType {
  @Field()
  bloodType: string

  @Field(() => Int)
  count: number
}

@ObjectType()
export class FulfillmentStatsType {
  @Field()
  bloodType: string

  @Field(() => Float)
  percentage: number

  @Field(() => Int)
  total: number

  @Field(() => Int)
  fulfilled: number
}

@ObjectType()
export class UrgencyStatsType {
  @Field()
  urgency: string

  @Field(() => Float)
  percentage: number

  @Field(() => Int)
  total: number

  @Field(() => Int)
  fulfilled: number
}

@ObjectType()
export class ResponseCountType {
  @Field(() => Int)
  count: number

  @Field(() => Float)
  percentage: number
}

@ObjectType()
export class DonorResponseStatsType {
  @Field(() => Int)
  total: number

  @Field(() => ResponseCountType)
  accepted: ResponseCountType

  @Field(() => ResponseCountType)
  escalated: ResponseCountType

  @Field(() => ResponseCountType)
  noResponse: ResponseCountType
}

@ObjectType()
export class TopBridgerType {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  facilityName?: string

  @Field(() => Int)
  requestCount: number

  @Field(() => Int)
  totalUnitsConfirmed: number
}

@ObjectType()
export class TimeSeriesDataType {
  @Field()
  month: string

  @Field(() => Int)
  count: number
}

@ObjectType()
export class AnalyticsType {
  @Field(() => Int)
  totalRequests: number

  @Field(() => [BloodInventoryType])
  bloodInventory: BloodInventoryType[]

  @Field(() => [FulfillmentStatsType])
  fulfillmentByBloodType: FulfillmentStatsType[]

  @Field(() => [UrgencyStatsType])
  fulfillmentByUrgency: UrgencyStatsType[]

  @Field()
  averageResponseTime: string

  @Field(() => DonorResponseStatsType)
  donorResponse: DonorResponseStatsType

  @Field(() => [TopBridgerType])
  topBridgers: TopBridgerType[]

  @Field(() => [TimeSeriesDataType])
  fulfillmentTimeSeries: TimeSeriesDataType[]
}
