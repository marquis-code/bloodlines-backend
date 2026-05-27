import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { User } from "../user/schemas/user.schema"
import { Notification } from "./schemas/notification.schema"
import { NotificationPreference } from "./schemas/notification-preference.schema"
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
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    @InjectModel(NotificationPreference.name) private preferenceModel: Model<NotificationPreference>,
    private emailService: EmailService,
  ) {}

  async getPreferences(userId: string) {
    let prefs = await this.preferenceModel.findOne({ userId });
    if (!prefs) {
      prefs = await this.preferenceModel.create({ userId });
    }
    return prefs;
  }

  async updatePreferences(userId: string, updateDto: any) {
    const prefs = await this.preferenceModel.findOneAndUpdate(
      { userId },
      { $set: updateDto },
      { new: true, upsert: true }
    );
    return prefs;
  }

  async getHistory(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.notificationModel.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.notificationModel.countDocuments({ userId })
    ]);

    return {
      data,
      page,
      limit,
      total,
      hasMore: total > skip + data.length
    };
  }

  async markRead(userId: string, notificationId: string) {
    const notification = await this.notificationModel.findOneAndUpdate(
      { _id: notificationId, userId },
      { read: true },
      { new: true }
    );
    if (!notification) throw new NotFoundException("Notification not found");
    return notification;
  }

  async markAllRead(userId: string) {
    await this.notificationModel.updateMany({ userId, read: false }, { read: true });
    return { message: "All notifications marked as read" };
  }

  async sendNotificationToUser(userId: string, notification: NotificationPayload) {
    const user = await this.userModel.findById(userId)
    if (!user) return

    // Save notification to history
    await this.notificationModel.create({
      userId: new Types.ObjectId(userId),
      title: notification.title,
      body: notification.body,
      type: notification.type,
      data: notification.data
    })

    const prefs = await this.getPreferences(userId)

    // Check specific preferences before sending
    const isEmergency = notification.type === "blood_request"
    const isDonationReminder = notification.type === "donor_response" || notification.type === "request_fulfilled" || notification.type === "donor_arrival"
    const isCommunity = notification.type === "general"

    const shouldSend = 
      (isEmergency && prefs.emergencyAlerts) ||
      (isDonationReminder && prefs.donationReminders) ||
      (isCommunity && prefs.communityUpdates) ||
      (!isEmergency && !isDonationReminder && !isCommunity)

    if (!shouldSend) return

    // Send email notification if enabled
    if (user.emailNotifications && prefs.emailEnabled) {
      await this.sendEmailNotification(user.email, notification)
    }

    // Send SMS notification if enabled
    if (user.smsNotifications && prefs.smsEnabled) {
      await this.sendSMSNotification(user.phoneNumber, notification)
    }

    // Push notifications are handled via WebSocket and preferences.pushEnabled
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
      await this.emailService.sendNotification(
        email,
        notification.title,
        notification.body,
        notification.data,
      )
    } catch (error) {
      console.error("Failed to send email notification:", error)
    }
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