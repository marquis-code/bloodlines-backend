import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class DonationHistory {
  @ApiProperty({ example: "hist_123" })
  id: string

  @ApiProperty({ example: "City Hospital" })
  hospitalName: string

  @ApiProperty({ example: "A+" })
  bloodType: string

  @ApiProperty({ example: 1 })
  unitsGiven: number

  @ApiProperty({ example: "2024-01-15T10:00:00Z" })
  donatedAt: Date

  @ApiProperty({ example: "DONATED" })
  status: string // 'DONATED', 'DEFERRED', 'CANCELLED'

  @ApiProperty({ example: "Mercy Clinic" })
  facilityName: string

  @ApiPropertyOptional({ example: "123 Clinic Rd" })
  facilityAddress?: string

  @ApiPropertyOptional({ example: "+2348000000000" })
  facilityPhone?: string

  @ApiPropertyOptional({ example: "Smooth experience" })
  donorFeedback?: string
}

