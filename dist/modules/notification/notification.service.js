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
const email_service_1 = require("../email/email.service");
let NotificationService = class NotificationService {
    constructor(userModel, emailService) {
        this.userModel = userModel;
        this.emailService = emailService;
    }
    async sendNotificationToUser(userId, notification) {
        const user = await this.userModel.findById(userId);
        if (!user)
            return;
        if (user.emailNotifications) {
            await this.sendEmailNotification(user.email, notification);
        }
        if (user.smsNotifications) {
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
    __metadata("design:paramtypes", [mongoose_2.Model,
        email_service_1.EmailService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map