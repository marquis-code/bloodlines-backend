import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { BloodGroup } from "../../../common/enums/blood-group.enum"
import { PriorityLevel } from "../../../common/enums/priority-level.enum"

export enum DonationProgressStatusEnum {
  ACCEPTED = "ACCEPTED",
  ON_YOUR_WAY = "ON_YOUR_WAY",
  ARRIVED_AT_HOSPITAL = "ARRIVED_AT_HOSPITAL",
  DONATION_COMPLETE = "DONATION_COMPLETE",
  CANCELLED = "CANCELLED",
}

export enum DonationRequestStatusEnum {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  FULFILLED = "FULFILLED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export class DonationProgressUpdate {
  @ApiProperty({ example: "req_123" })
  requestId: string

  @ApiProperty({ enum: DonationProgressStatusEnum, example: DonationProgressStatusEnum.ACCEPTED })
  status: DonationProgressStatusEnum

  @ApiProperty({ example: "2024-02-21T10:00:00Z" })
  timestamp: Date

  @ApiPropertyOptional({ example: "Hospital Main Entrance" })
  location?: string

  @ApiPropertyOptional({ example: "30 minutes" })
  estimatedArrivalTime?: string
}

export class DonationRequest {
  @ApiProperty({ example: "req_123" })
  id: string

  @ApiProperty({ enum: BloodGroup, example: BloodGroup.A_POSITIVE })
  bloodType: BloodGroup

  @ApiProperty({ enum: PriorityLevel, example: PriorityLevel.URGENT })
  priority: PriorityLevel

  @ApiProperty({ example: 2 })
  unitsNeeded: number

  @ApiProperty({ example: "Mercy Hospital" })
  hospitalName: string

  @ApiProperty({ example: "123 Health St, Lagos" })
  address: string

  @ApiProperty({ example: "+2348012345678" })
  contactPhone: string

  @ApiProperty({ example: "Go to emergency ward" })
  instructions: string

  @ApiProperty({ example: "2024-02-21T08:00:00Z" })
  createdAt: Date

  @ApiPropertyOptional({ example: "2024-02-21T09:00:00Z" })
  acceptedAt?: Date

  @ApiPropertyOptional({ example: "2024-02-21T09:30:00Z" })
  rejectedAt?: Date

  @ApiProperty({ enum: DonationRequestStatusEnum, example: DonationRequestStatusEnum.PENDING })
  status: DonationRequestStatusEnum

  @ApiProperty({ example: 5.2 })
  distance: number
}

export class DonationHistory {
  @ApiProperty({ example: "hist_123" })
  id: string

  @ApiProperty({ example: "City Hospital" })
  hospitalName: string

  @ApiProperty({ example: "2024-01-15T10:00:00Z" })
  donatedAt: Date

  @ApiProperty({ enum: BloodGroup, example: BloodGroup.A_POSITIVE })
  bloodType: BloodGroup

  @ApiProperty({ example: 1 })
  unitsGiven: number

  @ApiProperty({ example: "COMPLETED" })
  status: string
}
