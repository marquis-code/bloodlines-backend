import { IsEmail, IsString, MinLength, Matches, IsEnum } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { Gender } from "../../../common/enums/gender.enum";

@InputType()
export class SignupDto {
  @Field()
  @IsString()
  fullName: string;

  @Field(() => Gender)
  @IsEnum(Gender)
  gender: Gender;

  @Field()
  @IsString()
  phoneNumber: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @Matches(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/\d/, { message: "Password must contain at least one number" })
  @Matches(/[!@#$%^&*]/, {
    message: "Password must contain at least one special character",
  })
  password: string;

  @Field()
  @IsString()
  confirmPassword: string;
}
