import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import configuration from "./config/configuration"
import { AuthModule } from "./modules/auth/auth.module"
import { UserModule } from "./modules/user/user.module"
import { OnboardingModule } from "./modules/onboarding/onboarding.module"
import { EmailModule } from "./modules/email/email.module"
import { BloodRequestModule } from "./modules/blood-request/blood-request.module"
import { AnalyticsModule } from "./modules/analytics/analytics.module"
import { RoleUpgradeModule } from "./modules/role-upgrade/role-upgrade.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database.uri"),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    UserModule,
    OnboardingModule,
    EmailModule,
    BloodRequestModule,
    AnalyticsModule,
    RoleUpgradeModule,
  ],
})
export class AppModule {}
