import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class UserType {
  @ApiProperty({ example: "user_123" })
  id: string

  @ApiProperty({ example: "user@example.com" })
  email: string

  @ApiProperty({ example: "John Doe" })
  fullName: string

  @ApiProperty({ example: "Male" })
  gender: string

  @ApiProperty({ example: "+2348012345678" })
  phoneNumber: string

  @ApiProperty({ example: "A+" })
  bloodGroup: string

  @ApiPropertyOptional({ example: "AA" })
  genotype?: string

  @ApiPropertyOptional({ example: "Lagos, Nigeria" })
  location?: string

  @ApiPropertyOptional({ example: "2024-01-01" })
  lastDonationDate?: string

  @ApiPropertyOptional({ example: "123 Street Name" })
  address?: string

  @ApiPropertyOptional({ example: "Lagos" })
  city?: string

  @ApiPropertyOptional({ example: "Lagos State" })
  state?: string

  @ApiPropertyOptional({ example: "Nigeria" })
  country?: string

  @ApiPropertyOptional({
    example: { type: "Point", coordinates: [3.3792, 6.5244] },
  })
  geoLocation?: {
    type: string
    coordinates: number[]
  }

  @ApiProperty({ example: true })
  isAvailable: boolean

  @ApiPropertyOptional({ example: "Jane Doe" })
  emergencyContact?: string

  @ApiPropertyOptional({ example: "+2348098765432" })
  emergencyContactPhone?: string

  @ApiProperty({ example: true })
  emailNotifications: boolean

  @ApiProperty({ example: true })
  smsNotifications: boolean

  @ApiProperty({ example: true })
  pushNotifications: boolean

  @ApiProperty({ example: true })
  emailVerified: boolean

  @ApiProperty({ example: "DONOR" })
  role: string

  @ApiPropertyOptional({ example: "Mercy Hospital" })
  facilityName?: string

  @ApiPropertyOptional({ example: "123 Health St" })
  facilityAddress?: string

  @ApiProperty({ example: 5 })
  donationCount: number

  @ApiProperty({ example: true })
  agreedToDonate: boolean

  @ApiProperty({ example: true })
  isActive: boolean

  @ApiProperty({ example: "2024-01-01T00:00:00Z" })
  createdAt: string

  @ApiProperty({ example: "2024-01-01T00:00:00Z" })
  updatedAt: string
}

