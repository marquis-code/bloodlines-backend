import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class BloodRequestType {
  @ApiProperty({ example: "req_123" })
  id: string

  @ApiProperty({ example: "A+" })
  bloodType: string

  @ApiProperty({ example: "URGENT" })
  priorityLevel: string

  @ApiProperty({ example: 2 })
  unitsNeeded: number

  @ApiProperty({ example: "+2348012345678" })
  contactPhone: string

  @ApiPropertyOptional({ example: "Urgent need for O- blood" })
  additionalNotes?: string

  @ApiProperty({ example: "PENDING" })
  status: string

  @ApiProperty({ example: "user_123" })
  createdBy: string

  @ApiPropertyOptional({ type: [String], example: ["donor_1", "donor_2"] })
  assignedDonors?: string[]

  @ApiProperty({ example: "WAITING" })
  donorResponseStatus: string

  @ApiPropertyOptional({ example: "2024-02-21T10:00:00Z" })
  fulfillmentDate?: string

  @ApiProperty({ example: 0 })
  unitsConfirmed: number

  @ApiProperty({ example: 0 })
  unitsEscalated: number

  @ApiProperty({ example: 0 })
  unitsNoResponse: number

  @ApiProperty({ example: "2024-02-21T08:00:00Z" })
  createdAt: string

  @ApiProperty({ example: "2024-02-21T08:00:00Z" })
  updatedAt: string
}

