import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { DonorDashboard } from "../../donor/types/donor-profile.type"

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

export class CurrentUserType extends UserType {
  @ApiPropertyOptional({
    type: DonorDashboard,
    description: "Included for donor accounts when includeDashboard=true is passed to GET /users/me.",
  })
  dashboard?: DonorDashboard
}
