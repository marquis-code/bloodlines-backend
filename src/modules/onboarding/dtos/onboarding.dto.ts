import {
  IsEmail,
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
} from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { BloodGroup } from "../../../common/enums/blood-group.enum";
import { Genotype } from "../../../common/enums/genotype.enum";

@InputType()
export class OnboardingStep1Dto {
  @Field()
  @IsString()
  fullName: string;

  @Field()
  @IsString()
  gender: string;

  @Field()
  @IsString()
  phoneNumber: string;
}

@InputType()
export class OnboardingStep2Dto {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => BloodGroup)
  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup;

  @Field(() => Genotype, { nullable: true })
  @IsOptional()
  @IsEnum(Genotype)
  genotype?: Genotype;

  @Field()
  @IsString()
  location: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  lastDonationDate?: string;
}

@InputType()
export class CompleteOnboardingDto {
  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  confirmPassword: string;
}
