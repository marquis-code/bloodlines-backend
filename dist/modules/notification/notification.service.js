"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const notification_schema_1 = require("./schemas/notification.schema");
const notification_preference_schema_1 = require("./schemas/notification-preference.schema");
const email_service_1 = require("../email/email.service");
let NotificationService = class NotificationService {
    constructor(userModel, notificationModel, preferenceModel, emailService) {
        this.userModel = userModel;
        this.notificationModel = notificationModel;
        this.preferenceModel = preferenceModel;
        this.emailService = emailService;
    }
    async getPreferences(userId) {
        let prefs = await this.preferenceModel.findOne({ userId });
        if (!prefs) {
            prefs = await this.preferenceModel.create({ userId });
        }
        return prefs;
    }
    async updatePreferences(userId, updateDto) {
        const prefs = await this.preferenceModel.findOneAndUpdate({ userId }, { $set: updateDto }, { new: true, upsert: true });
        return prefs;
    }
    async getHistory(userId, page = 1, limit = 10) {
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
    async markRead(userId, notificationId) {
        const notification = await this.notificationModel.findOneAndUpdate({ _id: notificationId, userId }, { read: true }, { new: true });
        if (!notification)
            throw new common_1.NotFoundException("Notification not found");
        return notification;
    }
    async markAllRead(userId) {
        await this.notificationModel.updateMany({ userId, read: false }, { read: true });
        return { message: "All notifications marked as read" };
    }
    async sendNotificationToUser(userId, notification) {
        const user = await this.userModel.findById(userId);
        if (!user)
            return;
        await this.notificationModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            title: notification.title,
            body: notification.body,
            type: notification.type,
            data: notification.data
        });
        const prefs = await this.getPreferences(userId);
        const isEmergency = notification.type === "blood_request";
        const isDonationReminder = notification.type === "donor_response" || notification.type === "request_fulfilled" || notification.type === "donor_arrival";
        const isCommunity = notification.type === "general";
        const shouldSend = (isEmergency && prefs.emergencyAlerts) ||
            (isDonationReminder && prefs.donationReminders) ||
            (isCommunity && prefs.communityUpdates) ||
            (!isEmergency && !isDonationReminder && !isCommunity);
        if (!shouldSend)
            return;
        if (user.emailNotifications && prefs.emailEnabled) {
            await this.sendEmailNotification(user.email, notification);
        }
        if (user.smsNotifications && prefs.smsEnabled) {
            await this.sendSMSNotification(user.phoneNumber, notification);
        }
    }
    async sendNotificationToMultipleUsers(userIds, notification) {
        const promises = userIds.map(userId => this.sendNotificationToUser(userId, notification));
        await Promise.all(promises);
    }
    async notifyNewBloodRequest(donorIds, requestDetails) {
        const notification = {
            title: "🩸 Urgent Blood Request",
            body: `${requestDetails.bloodType} blood needed. ${requestDetails.unitsNeeded} units required.`,
            type: "blood_request",
            data: requestDetails,
        };
        await this.sendNotificationToMultipleUsers(donorIds, notification);
    }
    async notifyDonorAcceptance(bridgerId, donorDetails) {
        const notification = {
            title: "✅ Donor Accepted Your Request",
            body: `${donorDetails.fullName} has accepted your blood request.`,
            type: "donor_response",
            data: donorDetails,
        };
        await this.sendNotificationToUser(bridgerId, notification);
    }
    async notifyRequestFulfilled(userIds, requestId) {
        const notification = {
            title: "🎉 Blood Request Fulfilled",
            body: "The blood request has been successfully fulfilled. Thank you!",
            type: "request_fulfilled",
            data: { requestId },
        };
        await this.sendNotificationToMultipleUsers(userIds, notification);
    }
    async notifyDonorArrival(bridgerId, donorDetails) {
        const notification = {
            title: "📍 Donor Arrived",
            body: `${donorDetails.fullName} has arrived at your facility.`,
            type: "donor_arrival",
            data: donorDetails,
        };
        await this.sendNotificationToUser(bridgerId, notification);
    }
    async sendEmailNotification(email, notification) {
        try {
            await this.emailService.sendNotification(email, notification.title, notification.body, notification.data);
        }
        catch (error) {
            console.error("Failed to send email notification:", error);
        }
    }
    async sendSMSNotification(phoneNumber, notification) {
        console.log(`SMS to ${phoneNumber}: ${notification.title} - ${notification.body}`);
    }
    async sendBulkNotification(userRole, notification) {
        const users = await this.userModel.find({ role: userRole });
        const userIds = users.map(user => user._id.toString());
        await this.sendNotificationToMultipleUsers(userIds, notification);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __param(2, (0, mongoose_1.InjectModel)(notification_preference_schema_1.NotificationPreference.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        email_service_1.EmailService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map