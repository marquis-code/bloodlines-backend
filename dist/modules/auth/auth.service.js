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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const user_schema_1 = require("../user/schemas/user.schema");
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    constructor(userModel, jwtService, emailService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.configService = configService;
    }
    async signup(signupDto) {
        const { email, password, confirmPassword, fullName, gender, phoneNumber, bloodGroup, genotype, location, address, city, state, country, lastDonationDate, } = signupDto;
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException("Passwords do not match");
        }
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException("Email already in use");
        }
        const existingPhone = await this.userModel.findOne({ phoneNumber });
        if (existingPhone) {
            throw new common_1.ConflictException("Phone number already in use");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailVerificationToken = crypto.randomBytes(32).toString("hex");
        const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const user = new this.userModel({
            email,
            password: hashedPassword,
            fullName,
            gender,
            phoneNumber,
            bloodGroup,
            genotype,
            location,
            address,
            city,
            state,
            country,
            lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : undefined,
            emailVerificationToken,
            emailVerificationExpiry,
            emailVerified: false,
        });
        await user.save();
        try {
            await this.emailService.sendEmailVerification(email, emailVerificationToken);
        }
        catch (error) {
            console.error("Failed to send verification email. Please check SMTP configuration.", error);
        }
        return {
            message: "Signup successful. Please verify your email.",
            userId: user._id,
        };
    }
    async verifyEmail(token) {
        const user = await this.userModel.findOne({
            emailVerificationToken: token,
            emailVerificationExpiry: { $gt: new Date() },
        });
        if (!user) {
            throw new common_1.BadRequestException("Invalid or expired verification token");
        }
        user.emailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpiry = undefined;
        await user.save();
        try {
            await this.emailService.sendWelcomeEmail(user.email, user.fullName);
        }
        catch (error) {
            console.error("Failed to send welcome email.", error);
        }
        return { message: "Email verified successfully. You can now login." };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid email or password");
        }
        if (!user.emailVerified) {
            throw new common_1.UnauthorizedException("Please verify your email first");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid email or password");
        }
        const jwtSecret = this.configService.get("jwt.secret");
        const jwtRefreshSecret = this.configService.get("jwt.refreshSecret") || "refresh_secret";
        const token = this.jwtService.sign({ sub: user._id.toString(), email: user.email, role: user.role }, { secret: jwtSecret, expiresIn: (this.configService.get("jwt.expiresIn") || "1h") });
        const refreshToken = this.jwtService.sign({ sub: user._id.toString() }, { secret: jwtRefreshSecret, expiresIn: (this.configService.get("jwt.refreshExpiresIn") || "7d") });
        user.refreshToken = refreshToken;
        await user.save();
        return {
            accessToken: token,
            refreshToken: refreshToken,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                emailVerified: user.emailVerified,
            },
        };
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return { message: "If email exists, a password reset link has been sent" };
        }
        const passwordResetToken = crypto.randomBytes(32).toString("hex");
        const passwordResetExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.passwordResetToken = passwordResetToken;
        user.passwordResetExpiry = passwordResetExpiry;
        await user.save();
        await this.emailService.sendPasswordReset(email, passwordResetToken);
        return { message: "If email exists, a password reset link has been sent" };
    }
    async resetPassword(resetPasswordDto) {
        const { token, newPassword, confirmPassword } = resetPasswordDto;
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException("Passwords do not match");
        }
        const user = await this.userModel.findOne({
            passwordResetToken: token,
            passwordResetExpiry: { $gt: new Date() },
        });
        if (!user) {
            throw new common_1.BadRequestException("Invalid or expired reset token");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpiry = undefined;
        await user.save();
        try {
            await this.emailService.sendPasswordResetSuccess(user.email, user.fullName);
        }
        catch (error) {
            console.error("Failed to send password reset confirmation email.", error);
        }
        return { message: "Password reset successfully. You can now login." };
    }
    async logout(userId) {
        await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
        return { message: "Logged out successfully" };
    }
    async refreshToken(refreshToken) {
        try {
            const jwtRefreshSecret = this.configService.get("jwt.refreshSecret") || "refresh_secret";
            const payload = this.jwtService.verify(refreshToken, { secret: jwtRefreshSecret });
            const user = await this.userModel.findOne({ _id: payload.sub, refreshToken });
            if (!user) {
                throw new common_1.UnauthorizedException("Invalid refresh token");
            }
            const jwtSecret = this.configService.get("jwt.secret");
            const newAccessToken = this.jwtService.sign({ sub: user._id.toString(), email: user.email, role: user.role }, { secret: jwtSecret, expiresIn: (this.configService.get("jwt.expiresIn") || "1h") });
            const newRefreshToken = this.jwtService.sign({ sub: user._id.toString() }, { secret: jwtRefreshSecret, expiresIn: (this.configService.get("jwt.refreshExpiresIn") || "7d") });
            user.refreshToken = newRefreshToken;
            await user.save();
            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        }
        catch (e) {
            throw new common_1.UnauthorizedException("Invalid or expired refresh token");
        }
    }
    async getMe(userId) {
        const user = await this.userModel.findById(userId).select("-password -refreshToken");
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        return user;
    }
    async resendVerification(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return { message: "If the email is registered and not verified, a new verification link will be sent." };
        }
        if (user.emailVerified) {
            return { message: "Email is already verified." };
        }
        const emailVerificationToken = crypto.randomBytes(32).toString("hex");
        const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        user.emailVerificationToken = emailVerificationToken;
        user.emailVerificationExpiry = emailVerificationExpiry;
        await user.save();
        try {
            await this.emailService.sendEmailVerification(email, emailVerificationToken);
        }
        catch (error) {
            console.error("Failed to resend verification email.", error);
        }
        return { message: "If the email is registered and not verified, a new verification link will be sent." };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        email_service_1.EmailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map