import { ApiPropertyOptional } from "@nestjs/swagger"

export class UpdateProfileInput {
  @ApiPropertyOptional({ example: "John Doe" })
  fullName?: string

  @ApiPropertyOptional({ example: "+2348012345678" })
  phone?: string

  @ApiPropertyOptional({ example: "A+" })
  bloodType?: string

  @ApiPropertyOptional({ example: "AA" })
  genotype?: string

  @ApiPropertyOptional({ example: "Male" })
  gender?: string

  @ApiPropertyOptional({ example: 6.5244 })
  latitude?: number

  @ApiPropertyOptional({ example: 3.3792 })
  longitude?: number

  @ApiPropertyOptional({ example: "Available" })
  availability?: string

  @ApiPropertyOptional({ example: "Jane Doe" })
  emergencyContact?: string

  @ApiPropertyOptional({ example: "+2348098765432" })
  emergencyContactPhone?: string
}

