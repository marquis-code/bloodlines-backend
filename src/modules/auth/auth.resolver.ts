import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dtos/signup.dto";
import { LoginDto } from "./dtos/login.dto";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signup(@Args("input") signupDto: SignupDto) {
    console.log("Here ");
    const result = await this.authService.signup(signupDto);
    return JSON.stringify(result);
  }

  @Query(() => String)
  async verifyEmail(@Args("token") token: string) {
    const result = await this.authService.verifyEmail(token);
    return JSON.stringify(result);
  }

  @Mutation(() => String)
  async login(@Args("input") loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return JSON.stringify(result);
  }

  @Mutation(() => String)
  async forgotPassword(@Args("input") forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto);
    return JSON.stringify(result);
  }

  @Mutation(() => String)
  async resetPassword(@Args("input") resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto);
    return JSON.stringify(result);
  }
}
