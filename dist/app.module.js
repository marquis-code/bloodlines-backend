"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const axios_1 = require("@nestjs/axios");
const path_1 = require("path");
const configuration_1 = __importDefault(require("./config/configuration"));
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const onboarding_module_1 = require("./modules/onboarding/onboarding.module");
const email_module_1 = require("./modules/email/email.module");
const blood_request_module_1 = require("./modules/blood-request/blood-request.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const role_upgrade_module_1 = require("./modules/role-upgrade/role-upgrade.module");
const jwt_config_1 = __importDefault(require("./config/jwt.config"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [".env.local", ".env"],
                load: [configuration_1.default, jwt_config_1.default],
                cache: true,
            }),
            axios_1.HttpModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    timeout: configService.get("axios.timeout"),
                    maxRedirects: configService.get("axios.maxRedirects"),
                    baseURL: configService.get("axios.baseURL"),
                }),
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get("database.uri"),
                }),
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    autoSchemaFile: (0, path_1.join)(process.cwd(), "src/schema.gql"),
                    sortSchema: true,
                    playground: configService.get("nodeEnv") !== "production",
                    introspection: true,
                    context: ({ req }) => ({ req }),
                    formatError: (error) => {
                        console.error("GraphQL Error:", error);
                        return error;
                    },
                }),
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            onboarding_module_1.OnboardingModule,
            email_module_1.EmailModule,
            blood_request_module_1.BloodRequestModule,
            analytics_module_1.AnalyticsModule,
            role_upgrade_module_1.RoleUpgradeModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map