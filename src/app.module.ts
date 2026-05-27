import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { HttpModule } from "@nestjs/axios"
import configuration from "./config/configuration"
import { AuthModule } from "./modules/auth/auth.module"
import { UserModule } from "./modules/user/user.module"
import { OnboardingModule } from "./modules/onboarding/onboarding.module"
import { EmailModule } from "./modules/email/email.module"
import { BloodRequestModule } from "./modules/blood-request/blood-request.module"
import { AnalyticsModule } from "./modules/analytics/analytics.module"
import { RoleUpgradeModule } from "./modules/role-upgrade/role-upgrade.module"
import { DonorModule } from "./modules/donor/donor.module"
import { PulseLeaderModule } from "./modules/pulse-leader/pulse-leader.module"
import { NotificationModule } from "./modules/notification/notification.module"
import { InventoryModule } from "./modules/inventory/inventory.module"
import { AppointmentModule } from "./modules/appointment/appointment.module"
import { BridgerModule } from "./modules/bridger/bridger.module"
import jwtConfig from "./config/jwt.config"

@Module({
  imports: [
    // Global ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
      load: [configuration, jwtConfig],
      cache: true,
    }),

    // Global HttpModule (Axios)
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get("axios.timeout"),
        maxRedirects: configService.get("axios.maxRedirects"),
        baseURL: configService.get("axios.baseURL"),
      }),
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("database.uri"),
      }),
    }),

    // Feature Modules
    AuthModule,
    UserModule,
    OnboardingModule,
    EmailModule,
    BloodRequestModule,
    AnalyticsModule,
    RoleUpgradeModule,
    DonorModule,
    PulseLeaderModule,
    NotificationModule,
    InventoryModule,
    AppointmentModule,
    BridgerModule,
  ],
})
export class AppModule { }