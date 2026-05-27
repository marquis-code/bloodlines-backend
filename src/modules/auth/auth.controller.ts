import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignupDto } from "./dtos/signup.dto"
import { LoginDto } from "./dtos/login.dto"
import { ForgotPasswordDto } from "./dtos/forgot-password.dto"
import { ResetPasswordDto } from "./dtos/reset-password.dto"
import { RefreshTokenDto } from "./dtos/refresh-token.dto"
import { ResendVerificationDto } from "./dtos/resend-verification.dto"
import { JwtAuthGuard } from "./guards/jwt.guard"
import { CurrentUser } from "./decorators/current-user.decorator"
import { UseGuards } from "@nestjs/common"

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("signup")
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto)
    }

    @Get("verify-email")
    async verifyEmail(@Query("token") token: string) {
        return this.authService.verifyEmail(token)
    }

    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post("forgot-password")
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto)
    }

    @Post("reset-password")
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto)
    }

    @Post("logout")
    @UseGuards(JwtAuthGuard)
    async logout(@CurrentUser() user: any) {
        return this.authService.logout(user.userId)
    }

    @Post("refresh-token")
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refreshToken)
    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    async getMe(@CurrentUser() user: any) {
        return this.authService.getMe(user.userId)
    }

    @Post("resend-verification")
    async resendVerification(@Body() resendVerificationDto: ResendVerificationDto) {
        return this.authService.resendVerification(resendVerificationDto.email)
    }
}
