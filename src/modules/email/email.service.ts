import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Resend } from "resend"

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private resend: Resend
  private readonly defaultFrom: string

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("email.apiKey")
    if (!apiKey) {
      this.logger.warn("RESEND_API_KEY is not defined in configuration. Email sending will be disabled.")
    }
    this.resend = new Resend(apiKey)
    this.defaultFrom = this.configService.get<string>("email.from")
  }

  // ─── Core Send Method ──────────────────────────────────────────────

  private async sendEmail(to: string, subject: string, html: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.defaultFrom,
        to,
        subject,
        html,
      })

      if (error) {
        this.logger.error(`Failed to send email to ${to}: ${JSON.stringify(error)}`)
        return null
      }

      this.logger.log(`Email sent to ${to}: ${subject}`)
      return data
    } catch (err) {
      this.logger.error(`Email exception for ${to}:`, err)
      return null
    }
  }

  // ─── Premium Brand Wrapper ─────────────────────────────────────────

  private brandWrapper(title: string, content: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');

          body { margin: 0; padding: 0; background-color: #fdf2f2; font-family: 'Outfit', 'Inter', -apple-system, sans-serif; }
          .email-wrapper { background-color: #fdf2f2; padding: 40px 15px; }
          .container {
            background-color: #ffffff;
            max-width: 580px;
            margin: 0 auto;
            border-radius: 40px;
            padding: 48px 40px;
            box-shadow: 0 20px 50px rgba(220, 38, 38, 0.06);
            border: 1px solid #fecaca;
            background-image: radial-gradient(at 0% 0%, rgba(220, 38, 38, 0.03) 0px, transparent 50%),
                              radial-gradient(at 100% 100%, rgba(127, 29, 29, 0.02) 0px, transparent 50%);
          }
          .logo { text-align: center; margin-bottom: 40px; }
          .logo-text {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.04em;
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .logo-tagline {
            font-size: 11px;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin-top: 4px;
          }

          .header { text-align: center; margin-bottom: 32px; }
          .title-pill {
            display: inline-block;
            padding: 8px 16px;
            background: #fef2f2;
            border-radius: 100px;
            margin-bottom: 16px;
          }
          .title-pill span {
            color: #dc2626;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          .title { color: #1e293b; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.03em; line-height: 1.2; }

          .content { font-size: 16px; line-height: 1.7; color: #475569; margin-bottom: 40px; }
          .content p { margin-bottom: 20px; }
          .content strong { color: #1e293b; font-weight: 600; }

          .action-area { text-align: center; margin: 40px 0; }
          .btn {
            display: inline-block;
            padding: 16px 36px;
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 20px;
            font-weight: 700;
            font-size: 15px;
            box-shadow: 0 12px 24px -6px rgba(220, 38, 38, 0.4);
            border: 1px solid rgba(255,255,255,0.2);
          }

          .otp-card {
            background: linear-gradient(to right, #fef2f2, #fff1f2);
            border-radius: 24px;
            padding: 32px;
            text-align: center;
            margin: 32px 0;
            border: 2px dashed #fecaca;
          }
          .otp-label { font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 12px; display: block; }
          .otp-code { font-size: 42px; font-weight: 800; letter-spacing: 12px; color: #dc2626; font-family: 'Outfit', monospace; text-shadow: 0 2px 4px rgba(0,0,0,0.05); }

          .info-card {
            background: linear-gradient(to right, #f8fafc, #f1f5f9);
            border-radius: 20px;
            padding: 24px;
            margin: 24px 0;
            border-left: 4px solid #dc2626;
          }
          .info-card p { margin: 4px 0; font-size: 14px; color: #475569; }
          .info-card strong { color: #1e293b; }

          .footer {
            text-align: center;
            padding: 32px 0 0;
            border-top: 1px solid #f1f5f9;
            margin-top: 40px;
          }
          .footer-text { font-size: 13px; color: #94a3b8; line-height: 1.6; }
          .footer-brand { font-weight: 700; color: #dc2626; margin-bottom: 8px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="logo">
              <div class="logo-text">🩸 Bloodlines</div>
              <div class="logo-tagline">Every Drop Counts</div>
            </div>
            <div class="header">
              <div class="title-pill"><span>Bloodlines Notification</span></div>
              <h1 class="title">${title}</h1>
            </div>
            <div class="content">
              ${content}
            </div>
            <div class="footer">
              <div class="footer-brand">Bloodlines Foundation</div>
              <div class="footer-text">
                &copy; ${new Date().getFullYear()} &bull; Connecting donors. Saving lives.<br>
                Lagos, Nigeria
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  // ─── Auth Emails ───────────────────────────────────────────────────

  async sendEmailVerification(email: string, token: string) {
    const appUrl = this.configService.get<string>("API_BASE_URL") || "http://localhost:3005"
    const verificationLink = `${appUrl}/auth/verify-email?token=${token}`

    const html = this.brandWrapper(
      "Verify Your Email",
      `
      <p>Welcome to <strong>Bloodlines</strong>! We're excited to have you join our community of heroes.</p>
      <p>Please verify your email address to complete your registration and start making a difference.</p>
      <div class="action-area">
        <a href="${verificationLink}" class="btn">Verify My Email</a>
      </div>
      <p style="font-size: 13px; color: #94a3b8; text-align: center;">This link will expire in 24 hours.</p>
      <p style="font-size: 13px; color: #94a3b8; text-align: center;">If you didn't create an account, you can safely ignore this email.</p>
      `,
    )

    return this.sendEmail(email, "Verify Your Email - Bloodlines", html)
  }

  async sendWelcomeEmail(email: string, fullName: string) {
    const html = this.brandWrapper(
      "Welcome to Bloodlines!",
      `
      <p>Hi <strong>${fullName}</strong>,</p>
      <p>Your email has been successfully verified. Welcome to the Bloodlines community! 🎉</p>
      <p>You're now part of a network dedicated to saving lives through blood donation. Here's what you can do next:</p>
      <div class="info-card">
        <p>🩸 <strong>Complete your profile</strong> — Add your blood group and location</p>
        <p>📍 <strong>Enable location</strong> — Get matched with nearby requests</p>
        <p>🔔 <strong>Stay alert</strong> — Respond quickly to urgent requests</p>
      </div>
      <p>Every donation can save up to <strong>3 lives</strong>. Together, we can make a difference.</p>
      `,
    )

    return this.sendEmail(email, "Welcome to Bloodlines! 🩸", html)
  }

  async sendPasswordReset(email: string, token: string) {
    const appUrl = this.configService.get<string>("CORS_ORIGIN") || "http://localhost:3000"
    const resetLink = `${appUrl}/reset-password?token=${token}`

    const html = this.brandWrapper(
      "Reset Your Password",
      `
      <p>We received a request to reset your password. No worries — it happens to the best of us!</p>
      <p>Click the button below to create a new secure password:</p>
      <div class="action-area">
        <a href="${resetLink}" class="btn">Reset My Password</a>
      </div>
      <p style="font-size: 13px; color: #94a3b8; text-align: center;">This link will expire in 1 hour.</p>
      <p style="font-size: 13px; color: #94a3b8; text-align: center;">If you didn't request a password reset, please ignore this email. Your account is safe.</p>
      `,
    )

    return this.sendEmail(email, "Reset Your Password - Bloodlines", html)
  }

  async sendPasswordResetSuccess(email: string, fullName: string) {
    const html = this.brandWrapper(
      "Password Changed",
      `
      <p>Hi <strong>${fullName}</strong>,</p>
      <p>Your password has been successfully changed. You can now log in with your new password.</p>
      <div class="info-card">
        <p>🔒 <strong>Security tip:</strong> If you didn't make this change, contact our support team immediately.</p>
      </div>
      <p>Stay safe and keep saving lives! 🩸</p>
      `,
    )

    return this.sendEmail(email, "Password Changed Successfully - Bloodlines", html)
  }

  // ─── Role Upgrade Emails ──────────────────────────────────────────

  async sendRoleUpgradeNotification(email: string, userName: string, requestedRole: string) {
    const html = this.brandWrapper(
      "Role Upgrade Request Received",
      `
      <p>Hi <strong>${userName}</strong>,</p>
      <p>We've received your request to upgrade your role to <strong>${requestedRole}</strong>.</p>
      <div class="info-card">
        <p>📋 <strong>What happens next?</strong></p>
        <p>Our team will review your request and verify your eligibility. This typically takes 24-48 hours.</p>
        <p>We'll notify you via email once a decision has been made.</p>
      </div>
      <p>Thank you for your dedication to the Bloodlines community! 🙏</p>
      `,
    )

    return this.sendEmail(email, "Role Upgrade Request Received - Bloodlines", html)
  }

  async sendRoleUpgradeApproved(email: string, userName: string, newRole: string) {
    const html = this.brandWrapper(
      "Role Upgrade Approved! 🎉",
      `
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Great news! Your request to upgrade to <strong>${newRole}</strong> has been <strong>approved</strong>.</p>
      <div class="info-card">
        <p>✅ <strong>Your new role is now active</strong></p>
        <p>You can now access all features available to the ${newRole} role. Log in to explore your expanded capabilities.</p>
      </div>
      <p>Thank you for your continued service to the Bloodlines community!</p>
      `,
    )

    return this.sendEmail(email, "Role Upgrade Approved - Bloodlines", html)
  }

  async sendRoleUpgradeRejected(email: string, userName: string, requestedRole: string, reason: string) {
    const html = this.brandWrapper(
      "Role Upgrade Update",
      `
      <p>Hi <strong>${userName}</strong>,</p>
      <p>After careful review, your request to upgrade to <strong>${requestedRole}</strong> could not be approved at this time.</p>
      <div style="background-color: #fff7ed; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0; color: #92400e; border-radius: 12px;">
        <strong>Reason:</strong> ${reason || "Please continue contributing to the community and try again later."}
      </div>
      <p>Don't be discouraged! Continue your incredible work as a donor and you'll be eligible again soon.</p>
      `,
    )

    return this.sendEmail(email, "Role Upgrade Update - Bloodlines", html)
  }

  // ─── Notification Emails ──────────────────────────────────────────

  async sendNotification(email: string, title: string, body: string, data?: any) {
    let extraContent = ""
    if (data?.requestId) {
      extraContent = `
        <div class="info-card">
          <p>📋 <strong>Request ID:</strong> ${data.requestId}</p>
          ${data.bloodType ? `<p>🩸 <strong>Blood Type:</strong> ${data.bloodType}</p>` : ""}
          ${data.unitsNeeded ? `<p>📊 <strong>Units Needed:</strong> ${data.unitsNeeded}</p>` : ""}
        </div>
      `
    }

    const html = this.brandWrapper(
      title,
      `
      <p>${body}</p>
      ${extraContent}
      <p style="font-size: 13px; color: #94a3b8; text-align: center;">Open the Bloodlines app to take action.</p>
      `,
    )

    return this.sendEmail(email, `${title} - Bloodlines`, html)
  }
}
