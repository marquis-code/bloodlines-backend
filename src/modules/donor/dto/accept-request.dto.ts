import { ApiProperty } from "@nestjs/swagger"

export class AcceptRequestInput {
  @ApiProperty({ example: "req_123" })
  requestId: string

  @ApiProperty({ example: 6.5244, required: false })
  latitude?: number

  @ApiProperty({ example: 3.3792, required: false })
  longitude?: number
}

