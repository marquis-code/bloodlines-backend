import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import * as bcrypt from "bcrypt"
import * as crypto from "crypto"
import { User } from "../user/schemas/user.schema"
import { SignupDto } from "./dtos/signup.dto"
import { LoginDto } from "./dtos/login.dto"
import { ForgotPasswordDto } from "./dtos/forgot-password.dto"
import { ResetPasswordDto } from "./dtos/reset-password.dto"
import { EmailService } from "../email/email.service"

@Injectable()
export class AuthService {
  constructor(
     @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, confirmPassword, fullName, gender, phoneNumber } = signupDto

    if (password !== confirmPassword) {
      throw new BadRequestException("Passwords do not match")
    }

    const existingUser = await this.userModel.findOne({ email })
    if (existingUser) {
      throw new ConflictException("Email already in use")
    }

    const existingPhone = await this.userModel.findOne({ phoneNumber })
    if (existingPhone) {
      throw new ConflictException("Phone number already in use")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const emailVerificationToken = crypto.randomBytes(32).toString("hex")
    const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const user = new this.userModel({
      email,
      password: hashedPassword,
      fullName,
      gender,
      phoneNumber,
      emailVerificationToken,
      emailVerificationExpiry,
      emailVerified: false,
    })

    await user.save()
    await this.emailService.sendEmailVerification(email, emailVerificationToken)

    return {
      message: "Signup successful. Please verify your email.",
      userId: user._id,
    }
  }

  async verifyEmail(token: string) {
    const user = await this.userModel.findOne({
      emailVerificationToken: token,
      emailVerificationExpiry: { $gt: new Date() },
    })

    if (!user) {
      throw new BadRequestException("Invalid or expired verification token")
    }

    user.emailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined
    await user.save()

    return { message: "Email verified successfully. You can now login." }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new UnauthorizedException("Invalid email or password")
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException("Please verify your email first")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password")
    }

    const jwtSecret = this.configService.get<string>("jwt.secret")
    const token = this.jwtService.sign(
      {
        sub: user._id,
        email: user.email,
        role: user.role,
      },
      { secret: jwtSecret },
    )

    return {
      accessToken: token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto

    const user = await this.userModel.findOne({ email })
    if (!user) {
      return { message: "If email exists, a password reset link has been sent" }
    }

    const passwordResetToken = crypto.randomBytes(32).toString("hex")
    const passwordResetExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000)

    user.passwordResetToken = passwordResetToken
    user.passwordResetExpiry = passwordResetExpiry
    await user.save()

    await this.emailService.sendPasswordReset(email, passwordResetToken)

    return { message: "If email exists, a password reset link has been sent" }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword, confirmPassword } = resetPasswordDto

    if (newPassword !== confirmPassword) {
      throw new BadRequestException("Passwords do not match")
    }

    const user = await this.userModel.findOne({
      passwordResetToken: token,
      passwordResetExpiry: { $gt: new Date() },
    })

    if (!user) {
      throw new BadRequestException("Invalid or expired reset token")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    user.passwordResetToken = undefined
    user.passwordResetExpiry = undefined
    await user.save()

    return { message: "Password reset successfully. You can now login." }
  }
}
