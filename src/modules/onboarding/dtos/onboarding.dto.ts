import { IsEmail, IsString, IsEnum, IsDateString, IsOptional } from "class-validator"
import { BloodGroup } from "../../../common/enums/blood-group.enum"
import { Genotype } from "../../../common/enums/genotype.enum"

export class OnboardingStep1Dto {
  @IsString()
  fullName: string

  @IsString()
  gender: string

  @IsString()
  phoneNumber: string
}

export class OnboardingStep2Dto {
  @IsEmail()
  email: string

  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup

  @IsOptional()
  @IsEnum(Genotype)
  genotype?: Genotype

  @IsString()
  location: string

  @IsOptional()
  @IsDateString()
  lastDonationDate?: string
}

export class CompleteOnboardingDto {
  @IsString()
  password: string

  @IsString()
  confirmPassword: string
}
