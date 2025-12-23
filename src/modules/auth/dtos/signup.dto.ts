import { IsEmail, IsString, MinLength, Matches, IsEnum } from "class-validator"
import { Gender } from "../../../common/enums/gender.enum"

export class SignupDto {
  @IsString()
  fullName: string

  @IsEnum(Gender)
  gender: Gender

  @IsString()
  phoneNumber: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @Matches(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  @Matches(/[0-9]/, { message: "Password must contain at least one number" })
  @Matches(/[!@#$%^&*]/, { message: "Password must contain at least one special character" })
  password: string

  @IsString()
  confirmPassword: string
}
