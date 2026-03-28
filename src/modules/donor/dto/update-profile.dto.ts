import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean, IsDateString } from "class-validator"
import { BloodGroup } from "../../../common/enums/blood-group.enum"
import { Genotype } from "../../../common/enums/genotype.enum"
import { Gender } from "../../../common/enums/gender.enum"

export class UpdateProfileInput {
  @ApiPropertyOptional({ example: "John Doe" })
  @IsOptional()
  @IsString()
  fullName?: string

  @ApiPropertyOptional({ example: "+2348012345678" })
  @IsOptional()
  @IsString()
  phoneNumber?: string

  @ApiPropertyOptional({ enum: BloodGroup, example: BloodGroup.O_POSITIVE })
  @IsOptional()
  @IsEnum(BloodGroup)
  bloodGroup?: BloodGroup

  @ApiPropertyOptional({ enum: Genotype, example: Genotype.AA })
  @IsOptional()
  @IsEnum(Genotype)
  genotype?: string

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE })
  @IsOptional()
  @IsEnum(Gender)
  gender?: string

  @ApiPropertyOptional({ example: 6.5244 })
  @IsOptional()
  @IsNumber()
  latitude?: number

  @ApiPropertyOptional({ example: 3.3792 })
  @IsOptional()
  @IsNumber()
  longitude?: number

  @ApiPropertyOptional({ example: "Lagos, Nigeria" })
  @IsOptional()
  @IsString()
  location?: string

  @ApiPropertyOptional({ example: "123 Street Name" })
  @IsOptional()
  @IsString()
  address?: string

  @ApiPropertyOptional({ example: "Lagos" })
  @IsOptional()
  @IsString()
  city?: string

  @ApiPropertyOptional({ example: "Lagos State" })
  @IsOptional()
  @IsString()
  state?: string

  @ApiPropertyOptional({ example: "Nigeria" })
  @IsOptional()
  @IsString()
  country?: string

  @ApiPropertyOptional({ example: "2023-10-01" })
  @IsOptional()
  @IsDateString()
  lastDonationDate?: string

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean

  @ApiPropertyOptional({ example: "Jane Doe" })
  @IsOptional()
  @IsString()
  emergencyContact?: string

  @ApiPropertyOptional({ example: "+2348098765432" })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string
}

