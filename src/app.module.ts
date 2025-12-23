import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
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

    // GraphQL Configuration
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // Generate schema file with proper formatting
        autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        sortSchema: true,
        
        // Disable CSRF protection for development/testing
        // In production, clients should send proper headers
        csrfPrevention: false,
        
        // Enable Apollo Sandbox
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        
        // Keep introspection enabled for documentation
        introspection: true,
        
        // Add schema building options for better readability
        buildSchemaOptions: {
          numberScalarMode: 'integer',
        },
        
        // Context for auth
        context: ({ req }) => ({ req }),
        
        // Better error formatting with more details
        formatError: (formattedError, error) => {
          console.error("GraphQL Error:", {
            message: formattedError.message,
            locations: formattedError.locations,
            path: formattedError.path,
            extensions: formattedError.extensions,
          });
          
          // Return clean errors to client
          return {
            message: formattedError.message,
            locations: formattedError.locations,
            path: formattedError.path,
            extensions: {
              code: formattedError.extensions?.code,
              ...formattedError.extensions,
            },
          };
        },

        // Include stack trace only in development
        includeStacktraceInErrorResponses: configService.get("nodeEnv") !== "production",
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