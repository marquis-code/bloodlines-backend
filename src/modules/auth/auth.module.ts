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
      // @ts-ignore
      useFactory: (configService: ConfigService) => ({        
          secret: configService.get<string>("jwt.secret") || configService.get<string>("JWT_SECRET") || "your-secret-key-change-this",
          signOptions: { 
            expiresIn: configService.get<string>("jwt.expiresIn") || configService.get<string>("JWT_EXPIRES_IN") || "7d"
          }
      })
    }),
    EmailModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}