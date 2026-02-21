import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { DonationProgressStatusEnum } from "../types/donation-request.type"

export class UpdateProgressInput {
  @ApiProperty({ example: "req_123" })
  requestId: string

  @ApiProperty({ enum: DonationProgressStatusEnum, example: DonationProgressStatusEnum.ACCEPTED })
  status: DonationProgressStatusEnum

  @ApiPropertyOptional({ example: "At hospital" })
  location?: string

  @ApiPropertyOptional({ example: "15 mins" })
  estimatedArrivalTime?: string
}

