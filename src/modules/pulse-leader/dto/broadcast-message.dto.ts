import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class BroadcastMessageDto {
  @ApiProperty({ example: "req_123" })
  requestId: string

  @ApiProperty({ example: "Lagos pulse leaders: We need A+ blood at Mercy Hospital urgently!" })
  messageContent: string

  @ApiPropertyOptional({ type: [String], example: ["donor_1", "donor_2"] })
  recipientDonorIds?: string[]

  @ApiPropertyOptional({ example: "A+" })
  bloodType?: string

  @ApiPropertyOptional({ type: [Number], example: [6.5244, 3.3792] })
  coordinates?: [number, number]

  @ApiPropertyOptional({ example: 10 })
  radiusKm?: number

  @ApiPropertyOptional({ example: "BOTH" })
  broadcastMethod?: string // 'SMS', 'PUSH', 'BOTH'
}

