import { IsString, MinLength, Matches } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsString()
  token: string;

  @Field()
  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/\d/, { message: "Password must contain at least one number" })
  @Matches(/[!@#$%^&*]/, {
    message: "Password must contain at least one special character",
  })
  newPassword: string;

  @Field()
  @IsString()
  confirmPassword: string;
}
