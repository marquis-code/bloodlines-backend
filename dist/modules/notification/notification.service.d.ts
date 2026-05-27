import { Model, Types } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { Notification } from "./schemas/notification.schema";
import { NotificationPreference } from "./schemas/notification-preference.schema";
import { EmailService } from "../email/email.service";
export interface NotificationPayload {
    title: string;
    body: string;
    data?: any;
    type: "blood_request" | "donor_response" | "request_fulfilled" | "donor_arrival" | "general";
}
export declare class NotificationService {
    private userModel;
    private notificationModel;
    private preferenceModel;
    private emailService;
    constructor(userModel: Model<User>, notificationModel: Model<Notification>, preferenceModel: Model<NotificationPreference>, emailService: EmailService);
    getPreferences(userId: string): Promise<import("mongoose").Document<unknown, {}, NotificationPreference, {}, import("mongoose").DefaultSchemaOptions> & NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePreferences(userId: string, updateDto: any): Promise<import("mongoose").Document<unknown, {}, NotificationPreference, {}, import("mongoose").DefaultSchemaOptions> & NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getHistory(userId: string, page?: number, limit?: number): Promise<{
        data: (Notification & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    markRead(userId: string, notificationId: string): Promise<import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    markAllRead(userId: string): Promise<{
        message: string;
    }>;
    sendNotificationToUser(userId: string, notification: NotificationPayload): Promise<void>;
    sendNotificationToMultipleUsers(userIds: string[], notification: NotificationPayload): Promise<void>;
    notifyNewBloodRequest(donorIds: string[], requestDetails: any): Promise<void>;
    notifyDonorAcceptance(bridgerId: string, donorDetails: any): Promise<void>;
    notifyRequestFulfilled(userIds: string[], requestId: string): Promise<void>;
    notifyDonorArrival(bridgerId: string, donorDetails: any): Promise<void>;
    private sendEmailNotification;
    private sendSMSNotification;
    sendBulkNotification(userRole: string, notification: NotificationPayload): Promise<void>;
}
