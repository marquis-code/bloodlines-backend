import { Model } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { EmailService } from "../email/email.service";
export interface NotificationPayload {
    title: string;
    body: string;
    data?: any;
    type: "blood_request" | "donor_response" | "request_fulfilled" | "donor_arrival" | "general";
}
export declare class NotificationService {
    private userModel;
    private emailService;
    constructor(userModel: Model<User>, emailService: EmailService);
    sendNotificationToUser(userId: string, notification: NotificationPayload): Promise<void>;
    sendNotificationToMultipleUsers(userIds: string[], notification: NotificationPayload): Promise<void>;
    notifyNewBloodRequest(donorIds: string[], requestDetails: any): Promise<void>;
    notifyDonorAcceptance(bridgerId: string, donorDetails: any): Promise<void>;
    notifyRequestFulfilled(userIds: string[], requestId: string): Promise<void>;
    notifyDonorArrival(bridgerId: string, donorDetails: any): Promise<void>;
    private sendEmailNotification;
    private generateEmailHTML;
    private sendSMSNotification;
    sendBulkNotification(userRole: string, notification: NotificationPayload): Promise<void>;
}
