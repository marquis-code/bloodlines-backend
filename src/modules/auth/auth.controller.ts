import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { SignupDto } from "./dtos/signup.dto"
import { LoginDto } from "./dtos/login.dto"
import { ForgotPasswordDto } from "./dtos/forgot-password.dto"
import { ResetPasswordDto } from "./dtos/reset-password.dto"

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
}
