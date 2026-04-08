import { IsEmail } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ForgotPasswordDto {
  @Field()
  @IsEmail()
  email: string;
}
