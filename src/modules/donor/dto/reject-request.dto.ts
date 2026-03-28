import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class RejectRequestInput {
  @ApiProperty({ example: "req_123" })
  requestId: string

  @ApiPropertyOptional({ example: "Too far away" })
  reason?: string
}

