import { IsEmail, IsString, MinLength, Matches, IsEnum, IsOptional, IsDateString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Gender } from "../../../common/enums/gender.enum"
import { BloodGroup } from "../../../common/enums/blood-group.enum"
import { Genotype } from "../../../common/enums/genotype.enum"

export class SignupDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  fullName: string

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  gender: Gender

  @ApiProperty({ example: "+2348012345678" })
  @IsString()
  phoneNumber: string

  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "Pass123!@#" })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @Matches(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  @Matches(/[0-9]/, { message: "Password must contain at least one number" })
  @Matches(/[!@#$%^&*]/, { message: "Password must contain at least one special character" })
  password: string

  @ApiProperty({ example: "Pass123!@#" })
  @IsString()
  confirmPassword: string

  @ApiPropertyOptional({ enum: BloodGroup, example: BloodGroup.O_POSITIVE })
  @IsOptional()
  @IsEnum(BloodGroup)
  bloodGroup?: BloodGroup

  @ApiPropertyOptional({ enum: Genotype, example: Genotype.AA })
  @IsOptional()
  @IsEnum(Genotype)
  genotype?: Genotype

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
}

