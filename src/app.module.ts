import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { HttpModule } from "@nestjs/axios"
import { join } from "path"
import configuration from "./config/configuration"
import { AuthModule } from "./modules/auth/auth.module"
import { UserModule } from "./modules/user/user.module"
import { OnboardingModule } from "./modules/onboarding/onboarding.module"
import { EmailModule } from "./modules/email/email.module"
import { BloodRequestModule } from "./modules/blood-request/blood-request.module"
import { AnalyticsModule } from "./modules/analytics/analytics.module"
import { RoleUpgradeModule } from "./modules/role-upgrade/role-upgrade.module"
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
        timeout: configService.get<number>("axios.timeout"),
        maxRedirects: configService.get<number>("axios.maxRedirects"),
        baseURL: configService.get<string>("axios.baseURL"),
      }),
    }),
    
    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("database.uri"),
      }),
    }),
    
    // GraphQL Configuration
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        sortSchema: true,
        playground: configService.get<string>("nodeEnv") !== "production",
        introspection: true,
        context: ({ req }) => ({ req }),
        formatError: (error) => {
          console.error("GraphQL Error:", error)
          return error
        },
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
  ],
})
export class AppModule {}