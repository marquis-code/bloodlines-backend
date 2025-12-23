import { ConfigService } from "@nestjs/config";
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendEmailVerification(email: string, token: string): Promise<any>;
    sendPasswordReset(email: string, token: string): Promise<any>;
    sendRoleUpgradeNotification(email: string, userName: string, requestedRole: string): Promise<any>;
}
