import { IsEmail, IsString, MinLength, Matches, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "../../../common/enums/gender.enum";
import { Genotype } from "../../../common/enums/genotype.enum";
import { BloodGroup } from "../../../common/enums/blood-group.enum";

export class SignupDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  fullName: string;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: "+2348012345678" })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Genotype, example: Genotype.AA })
  @IsEnum(Genotype)
  genotype: Genotype;

  @ApiProperty({ enum: BloodGroup, example: BloodGroup.O_POSITIVE })
  @IsEnum(BloodGroup)
  bloodGroup: BloodGroup;

  @ApiProperty({ example: "Pass123!@#" })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @Matches(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/[0-9]/, { message: "Password must contain at least one number" })
  @Matches(/[!@#$%^&*]/, {
    message: "Password must contain at least one special character",
  })
  password: string;

  @ApiProperty({ example: "Pass123!@#" })
  @IsString()
  confirmPassword: string;
}
