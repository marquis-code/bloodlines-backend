import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class RoleUpgradeRequestType {
  @ApiProperty({ example: "role_123" })
  id: string

  @ApiProperty({ example: "user_123" })
  userId: string

  @ApiProperty({ example: "PULSE_LEADER" })
  requestedRole: string

  @ApiProperty({ example: "Mercy Hospital" })
  facilityName: string

  @ApiProperty({ example: "123 Health St" })
  facilityAddress: string

  @ApiProperty({ example: "Want to coordinate more donations" })
  reason: string

  @ApiProperty({ example: "PENDING" })
  status: string

  @ApiPropertyOptional({ example: "admin_123" })
  reviewedBy?: string

  @ApiPropertyOptional({ example: "2024-02-21T10:00:00Z" })
  reviewDate?: string

  @ApiPropertyOptional({ example: "Insufficient information" })
  rejectionReason?: string

  @ApiProperty({ example: "2024-02-21T08:00:00Z" })
  createdAt: string

  @ApiProperty({ example: "2024-02-21T08:00:00Z" })
  updatedAt: string
}

