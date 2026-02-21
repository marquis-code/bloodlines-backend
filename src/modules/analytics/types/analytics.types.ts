import { ApiProperty } from "@nestjs/swagger"

export class BloodInventoryType {
  @ApiProperty({ example: "A+" })
  bloodType: string

  @ApiProperty({ example: 10 })
  count: number
}

export class FulfillmentStatsType {
  @ApiProperty({ example: "A+" })
  bloodType: string

  @ApiProperty({ example: 85.5 })
  percentage: number

  @ApiProperty({ example: 20 })
  total: number

  @ApiProperty({ example: 17 })
  fulfilled: number
}

export class UrgencyStatsType {
  @ApiProperty({ example: "URGENT" })
  urgency: string

  @ApiProperty({ example: 90.0 })
  percentage: number

  @ApiProperty({ example: 10 })
  total: number

  @ApiProperty({ example: 9 })
  fulfilled: number
}

export class ResponseCountType {
  @ApiProperty({ example: 15 })
  count: number

  @ApiProperty({ example: 75.0 })
  percentage: number
}

export class DonorResponseStatsType {
  @ApiProperty({ example: 20 })
  total: number

  @ApiProperty({ type: ResponseCountType })
  accepted: ResponseCountType

  @ApiProperty({ type: ResponseCountType })
  escalated: ResponseCountType

  @ApiProperty({ type: ResponseCountType })
  noResponse: ResponseCountType
}

export class TopBridgerType {
  @ApiProperty({ example: "user_123" })
  id: string

  @ApiProperty({ example: "John Doe" })
  name: string

  @ApiProperty({ example: "Mercy Hospital", required: false })
  facilityName?: string

  @ApiProperty({ example: 12 })
  requestCount: number

  @ApiProperty({ example: 25 })
  totalUnitsConfirmed: number
}

export class TimeSeriesDataType {
  @ApiProperty({ example: "Jan" })
  month: string

  @ApiProperty({ example: 45 })
  count: number
}

export class AnalyticsType {
  @ApiProperty({ example: 150 })
  totalRequests: number

  @ApiProperty({ type: [BloodInventoryType] })
  bloodInventory: BloodInventoryType[]

  @ApiProperty({ type: [FulfillmentStatsType] })
  fulfillmentByBloodType: FulfillmentStatsType[]

  @ApiProperty({ type: [UrgencyStatsType] })
  fulfillmentByUrgency: UrgencyStatsType[]

  @ApiProperty({ example: "15 mins" })
  averageResponseTime: string

  @ApiProperty({ type: DonorResponseStatsType })
  donorResponse: DonorResponseStatsType

  @ApiProperty({ type: [TopBridgerType] })
  topBridgers: TopBridgerType[]

  @ApiProperty({ type: [TimeSeriesDataType] })
  fulfillmentTimeSeries: TimeSeriesDataType[]
}

