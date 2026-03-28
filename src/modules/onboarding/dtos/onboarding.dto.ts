import { IsEmail, IsString, IsEnum, IsDateString, IsOptional } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { BloodGroup } from "../../../common/enums/blood-group.enum"
import { Genotype } from "../../../common/enums/genotype.enum"

export class OnboardingStep1Dto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  fullName: string

  @ApiProperty({ example: "Male" })
  @IsString()
  gender: string

  @ApiProperty({ example: "+2348012345678" })
  @IsString()
  phoneNumber: string
}

export class OnboardingStep2Dto {
  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string

  @ApiProperty({ enum: BloodGroup, example: BloodGroup.A_POSITIVE })
  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup

  @ApiPropertyOptional({ enum: Genotype, example: Genotype.AA })
  @IsOptional()
  @IsEnum(Genotype)
  genotype?: Genotype

  @ApiProperty({ example: "Lagos, Nigeria" })
  @IsString()
  location: string

  @ApiPropertyOptional({ example: "2024-01-01" })
  @IsOptional()
  @IsDateString()
  lastDonationDate?: string
}

export class CompleteOnboardingDto {
  @ApiProperty({ example: "password123" })
  @IsString()
  password: string

  @ApiProperty({ example: "password123" })
  @IsString()
  confirmPassword: string
}

