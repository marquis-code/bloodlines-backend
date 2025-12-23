"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        const emailConfig = this.configService.get("email");
        this.transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: emailConfig.port === 465,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.password,
            },
        });
    }
    async sendEmailVerification(email, token) {
        const appUrl = this.configService.get("app.url");
        const verificationLink = `${appUrl}/verify-email?token=${token}`;
        const mailOptions = {
            from: this.configService.get("email.from"),
            to: email,
            subject: "Email Verification - BloodLines",
            html: `
        <h1>Verify Your Email</h1>
        <p>Welcome to BloodLines! Please verify your email address to complete your registration.</p>
        <p><a href="${verificationLink}">Click here to verify your email</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not create this account, please ignore this email.</p>
      `,
        };
        return this.transporter.sendMail(mailOptions);
    }
    async sendPasswordReset(email, token) {
        const appUrl = this.configService.get("app.url");
        const resetLink = `${appUrl}/reset-password?token=${token}`;
        const mailOptions = {
            from: this.configService.get("email.from"),
            to: email,
            subject: "Password Reset - BloodLines",
            html: `
        <h1>Reset Your Password</h1>
        <p>We received a request to reset your password. Click the link below to reset it.</p>
        <p><a href="${resetLink}">Reset your password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
        };
        return this.transporter.sendMail(mailOptions);
    }
    async sendRoleUpgradeNotification(email, userName, requestedRole) {
        const mailOptions = {
            from: this.configService.get("email.from"),
            to: email,
            subject: "Role Upgrade Request Received - BloodLines",
            html: `
        <h1>Role Upgrade Request</h1>
        <p>Hello ${userName},</p>
        <p>We have received your request to upgrade your role to <strong>${requestedRole}</strong>.</p>
        <p>Our administrators will review your request and notify you once it has been processed.</p>
        <p>Thank you for your contribution to BloodLines!</p>
      `,
        };
        return this.transporter.sendMail(mailOptions);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map