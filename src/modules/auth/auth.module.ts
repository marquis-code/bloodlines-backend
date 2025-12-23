import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthService } from "./auth.service"
import { AuthResolver } from "./auth.resolver"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { User, UserSchema } from "../user/schemas/user.schema"
import { EmailModule } from "../email/email.module"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwt.secret"),
        signOptions: { expiresIn: configService.get<string>("jwt.expiresIn") },
      }),
    }),
    EmailModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
