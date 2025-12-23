import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as nodemailer from "nodemailer"

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter

  constructor(private configService: ConfigService) {
    const emailConfig = this.configService.get("email")
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
    })
  }

  async sendEmailVerification(email: string, token: string) {
    const appUrl = this.configService.get<string>("app.url")
    const verificationLink = `${appUrl}/verify-email?token=${token}`

    const mailOptions = {
      from: this.configService.get<string>("email.from"),
      to: email,
      subject: "Email Verification - BloodLines",
      html: `
        <h1>Verify Your Email</h1>
        <p>Welcome to BloodLines! Please verify your email address to complete your registration.</p>
        <p><a href="${verificationLink}">Click here to verify your email</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not create this account, please ignore this email.</p>
      `,
    }

    return this.transporter.sendMail(mailOptions)
  }

  async sendPasswordReset(email: string, token: string) {
    const appUrl = this.configService.get<string>("app.url")
    const resetLink = `${appUrl}/reset-password?token=${token}`

    const mailOptions = {
      from: this.configService.get<string>("email.from"),
      to: email,
      subject: "Password Reset - BloodLines",
      html: `
        <h1>Reset Your Password</h1>
        <p>We received a request to reset your password. Click the link below to reset it.</p>
        <p><a href="${resetLink}">Reset your password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    }

    return this.transporter.sendMail(mailOptions)
  }

  async sendRoleUpgradeNotification(email: string, userName: string, requestedRole: string) {
    const mailOptions = {
      from: this.configService.get<string>("email.from"),
      to: email,
      subject: "Role Upgrade Request Received - BloodLines",
      html: `
        <h1>Role Upgrade Request</h1>
        <p>Hello ${userName},</p>
        <p>We have received your request to upgrade your role to <strong>${requestedRole}</strong>.</p>
        <p>Our administrators will review your request and notify you once it has been processed.</p>
        <p>Thank you for your contribution to BloodLines!</p>
      `,
    }

    return this.transporter.sendMail(mailOptions)
  }
}
