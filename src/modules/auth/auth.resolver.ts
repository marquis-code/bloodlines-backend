import { Resolver, Mutation, Query } from "@nestjs/graphql"
import type { AuthService } from "./auth.service"
import type { SignupDto } from "./dtos/signup.dto"
import type { LoginDto } from "./dtos/login.dto"
import type { ForgotPasswordDto } from "./dtos/forgot-password.dto"
import type { ResetPasswordDto } from "./dtos/reset-password.dto"

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async signup(signupDto: SignupDto) {
    const result = await this.authService.signup(signupDto)
    return JSON.stringify(result)
  }

  @Query(() => String)
  async verifyEmail(token: string) {
    const result = await this.authService.verifyEmail(token)
    return JSON.stringify(result)
  }

  @Mutation(() => String)
  async login(loginDto: LoginDto) {
    const result = await this.authService.login(loginDto)
    return JSON.stringify(result)
  }

  @Mutation(() => String)
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto)
    return JSON.stringify(result)
  }

  @Mutation(() => String)
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto)
    return JSON.stringify(result)
  }
}
