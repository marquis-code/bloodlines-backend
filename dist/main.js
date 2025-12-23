"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const port = configService.get("port") || 3001;
    await app.listen(port, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${port}`);
        console.log(`🎮 GraphQL Playground: http://localhost:${port}/graphql`);
        console.log(`📊 Environment: ${configService.get("nodeEnv")}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map