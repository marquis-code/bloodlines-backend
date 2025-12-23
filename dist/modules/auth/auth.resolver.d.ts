import { AuthService } from "./auth.service";
import { SignupDto } from "./dtos/signup.dto";
import { LoginDto } from "./dtos/login.dto";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<string>;
    verifyEmail(token: string): Promise<string>;
    login(loginDto: LoginDto): Promise<string>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<string>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string>;
}
