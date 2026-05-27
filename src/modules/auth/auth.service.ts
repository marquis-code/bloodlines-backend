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
    const {
      email,
      password,
      confirmPassword,
      fullName,
      gender,
      phoneNumber,
      bloodGroup,
      genotype,
      location,
      address,
      city,
      state,
      country,
      lastDonationDate,
    } = signupDto

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
      bloodGroup,
      genotype,
      location,
      address,
      city,
      state,
      country,
      lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : undefined,
      emailVerificationToken,
      emailVerificationExpiry,
      emailVerified: false,
    })

    await user.save()
    try {
      await this.emailService.sendEmailVerification(email, emailVerificationToken)
    } catch (error) {
      console.error("Failed to send verification email. Please check SMTP configuration.", error)
    }

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

    try {
      await this.emailService.sendWelcomeEmail(user.email, user.fullName)
    } catch (error) {
      console.error("Failed to send welcome email.", error)
    }

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
    const jwtRefreshSecret = this.configService.get<string>("jwt.refreshSecret") || "refresh_secret"

    const token = this.jwtService.sign(
      { sub: user._id.toString(), email: user.email, role: user.role },
      { secret: jwtSecret, expiresIn: (this.configService.get<string>("jwt.expiresIn") || "1h") as any },
    )

    const refreshToken = this.jwtService.sign(
      { sub: user._id.toString() },
      { secret: jwtRefreshSecret, expiresIn: (this.configService.get<string>("jwt.refreshExpiresIn") || "7d") as any },
    )

    user.refreshToken = refreshToken
    await user.save()

    return {
      accessToken: token,
      refreshToken: refreshToken,
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

    try {
      await this.emailService.sendPasswordResetSuccess(user.email, user.fullName)
    } catch (error) {
      console.error("Failed to send password reset confirmation email.", error)
    }

    return { message: "Password reset successfully. You can now login." }
  }

  async logout(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null })
    return { message: "Logged out successfully" }
  }

  async refreshToken(refreshToken: string) {
    try {
      const jwtRefreshSecret = this.configService.get<string>("jwt.refreshSecret") || "refresh_secret"
      const payload = this.jwtService.verify(refreshToken, { secret: jwtRefreshSecret })

      const user = await this.userModel.findOne({ _id: payload.sub, refreshToken })
      if (!user) {
        throw new UnauthorizedException("Invalid refresh token")
      }

      const jwtSecret = this.configService.get<string>("jwt.secret")
      const newAccessToken = this.jwtService.sign(
        { sub: user._id.toString(), email: user.email, role: user.role },
        { secret: jwtSecret, expiresIn: (this.configService.get<string>("jwt.expiresIn") || "1h") as any },
      )

      const newRefreshToken = this.jwtService.sign(
        { sub: user._id.toString() },
        { secret: jwtRefreshSecret, expiresIn: (this.configService.get<string>("jwt.refreshExpiresIn") || "7d") as any },
      )

      user.refreshToken = newRefreshToken
      await user.save()

      return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    } catch (e) {
      throw new UnauthorizedException("Invalid or expired refresh token")
    }
  }

  async getMe(userId: string) {
    const user = await this.userModel.findById(userId).select("-password -refreshToken")
    if (!user) {
      throw new UnauthorizedException("User not found")
    }
    return user
  }

  async resendVerification(email: string) {
    const user = await this.userModel.findOne({ email })
    if (!user) {
      // Do not throw an error to prevent email enumeration
      return { message: "If the email is registered and not verified, a new verification link will be sent." }
    }

    if (user.emailVerified) {
      return { message: "Email is already verified." }
    }

    const emailVerificationToken = crypto.randomBytes(32).toString("hex")
    const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

    user.emailVerificationToken = emailVerificationToken
    user.emailVerificationExpiry = emailVerificationExpiry
    await user.save()

    try {
      await this.emailService.sendEmailVerification(email, emailVerificationToken)
    } catch (error) {
      console.error("Failed to resend verification email.", error)
    }

    return { message: "If the email is registered and not verified, a new verification link will be sent." }
  }
}
