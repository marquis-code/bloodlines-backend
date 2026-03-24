import { ConfigService } from "@nestjs/config";
export declare class EmailService {
    private configService;
    private readonly logger;
    private resend;
    private readonly defaultFrom;
    constructor(configService: ConfigService);
    private sendEmail;
    private brandWrapper;
    sendEmailVerification(email: string, token: string): Promise<import("resend").CreateEmailResponseSuccess>;
    sendWelcomeEmail(email: string, fullName: string): Promise<import("resend").CreateEmailResponseSuccess>;
    sendPasswordReset(email: string, token: string): Promise<import("resend").CreateEmailResponseSuccess>;
    sendPasswordResetSuccess(email: string, fullName: string): Promise<import("resend").CreateEmailResponseSuccess>;
    sendRoleUpgradeNotification(email: string, userName: string, requestedRole: string): Promise<import("resend").CreateEmailResponseSuccess>;
    sendRoleUpgradeApproved(email: string, userName: string, newRole: string): Promise<import("resend").CreateEmailResponseSuccess>;
    sendRoleUpgradeRejected(email: string, userName: string, requestedRole: string, reason: string): Promise<import("resend").CreateEmailResponseSuccess>;
    sendNotification(email: string, title: string, body: string, data?: any): Promise<import("resend").CreateEmailResponseSuccess>;
}
