import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { SignupDto } from "./dtos/signup.dto";
import { LoginDto } from "./dtos/login.dto";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { EmailService } from "../email/email.service";
export declare class AuthService {
    private userModel;
    private jwtService;
    private emailService;
    private configService;
    constructor(userModel: Model<User>, jwtService: JwtService, emailService: EmailService, configService: ConfigService);
    signup(signupDto: SignupDto): Promise<{
        message: string;
        userId: import("mongoose").Types.ObjectId;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            fullName: string;
            role: import("../../common/enums/role.enum").UserRole;
            emailVerified: true;
        };
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: string): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    resendVerification(email: string): Promise<{
        message: string;
    }>;
}
