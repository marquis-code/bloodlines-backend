import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "../user/schemas/user.schema"
import { EmailService } from "../email/email.service"

export interface NotificationPayload {
  title: string
  body: string
  data?: any
  type: "blood_request" | "donor_response" | "request_fulfilled" | "donor_arrival" | "general"
}

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private emailService: EmailService,
  ) {}

  async sendNotificationToUser(userId: string, notification: NotificationPayload) {
    const user = await this.userModel.findById(userId)
    if (!user) return

    // Send email notification if enabled
    if (user.emailNotifications) {
      await this.sendEmailNotification(user.email, notification)
    }

    // Send SMS notification if enabled
    if (user.smsNotifications) {
      await this.sendSMSNotification(user.phoneNumber, notification)
    }

    // Push notifications are handled via WebSocket
  }

  async sendNotificationToMultipleUsers(userIds: string[], notification: NotificationPayload) {
    const promises = userIds.map(userId => this.sendNotificationToUser(userId, notification))
    await Promise.all(promises)
  }

  async notifyNewBloodRequest(donorIds: string[], requestDetails: any) {
    const notification: NotificationPayload = {
      title: "🩸 Urgent Blood Request",
      body: `${requestDetails.bloodType} blood needed. ${requestDetails.unitsNeeded} units required.`,
      type: "blood_request",
      data: requestDetails,
    }

    await this.sendNotificationToMultipleUsers(donorIds, notification)
  }

  async notifyDonorAcceptance(bridgerId: string, donorDetails: any) {
    const notification: NotificationPayload = {
      title: "✅ Donor Accepted Your Request",
      body: `${donorDetails.fullName} has accepted your blood request.`,
      type: "donor_response",
      data: donorDetails,
    }

    await this.sendNotificationToUser(bridgerId, notification)
  }

  async notifyRequestFulfilled(userIds: string[], requestId: string) {
    const notification: NotificationPayload = {
      title: "🎉 Blood Request Fulfilled",
      body: "The blood request has been successfully fulfilled. Thank you!",
      type: "request_fulfilled",
      data: { requestId },
    }

    await this.sendNotificationToMultipleUsers(userIds, notification)
  }

  async notifyDonorArrival(bridgerId: string, donorDetails: any) {
    const notification: NotificationPayload = {
      title: "📍 Donor Arrived",
      body: `${donorDetails.fullName} has arrived at your facility.`,
      type: "donor_arrival",
      data: donorDetails,
    }

    await this.sendNotificationToUser(bridgerId, notification)
  }

  private async sendEmailNotification(email: string, notification: NotificationPayload) {
    try {
      // Check if EmailService has the expected methods
      if (typeof (this.emailService as any).sendEmail === 'function') {
        await (this.emailService as any).sendEmail({
          to: email,
          subject: notification.title,
          html: this.generateEmailHTML(notification),
        })
      } else if (typeof (this.emailService as any).sendMail === 'function') {
        // Alternative method name
        await (this.emailService as any).sendMail({
          to: email,
          subject: notification.title,
          html: this.generateEmailHTML(notification),
        })
      } else {
        // If neither method exists, log a warning
        console.warn(`EmailService does not have sendEmail or sendMail method. Skipping email to ${email}`)
      }
    } catch (error) {
      console.error("Failed to send email notification:", error)
    }
  }

  private generateEmailHTML(notification: NotificationPayload): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">${notification.title}</h2>
        <p style="font-size: 16px; color: #374151;">${notification.body}</p>
        ${notification.data ? `
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <pre style="margin: 0; white-space: pre-wrap;">${JSON.stringify(notification.data, null, 2)}</pre>
          </div>
        ` : ""}
        <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
          Open the BloodLines app to take action.
        </p>
      </div>
    `
  }

  private async sendSMSNotification(phoneNumber: string, notification: NotificationPayload) {
    // TODO: Implement SMS service (Twilio, AWS SNS, etc.)
    // For now, just log
    console.log(`SMS to ${phoneNumber}: ${notification.title} - ${notification.body}`)
    
    // Example Twilio implementation (uncomment when configured):
    /*
    try {
      const twilio = require('twilio')
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
      
      await client.messages.create({
        body: `${notification.title}\n\n${notification.body}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      })
    } catch (error) {
      console.error("Failed to send SMS:", error)
    }
    */
  }

  async sendBulkNotification(userRole: string, notification: NotificationPayload) {
    const users = await this.userModel.find({ role: userRole })
    const userIds = users.map(user => user._id.toString())
    await this.sendNotificationToMultipleUsers(userIds, notification)
  }
}