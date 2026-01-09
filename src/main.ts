import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { EmailService } from "./modules/email/email.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService instance
  const configService = app.get(ConfigService);

  // get email service and verify transporter
  const emailService = app.get(EmailService);
  if (
    configService.get<string>("email.clientId") &&
    configService.get<string>("email.clientSecret")
  ) {
    emailService
      .verifyTransporter()
      .then(() => {
        console.log("✅ Email transporter is ready to send emails");
      })
      .catch((error) => {
        console.error("❌ Error verifying email transporter:", error);
      });
  } else {
    console.warn(
      "⚠️ Email credentials not configured - email features will be unavailable"
    );
  }

  // Enable CORS - Allow all origins
  app.enableCors({
    origin: true, // This allows all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const port = configService.get<number>("port") || 3001;

  await app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`🎮 GraphQL Playground: http://localhost:${port}/graphql`);
    console.log(`📊 Environment: ${configService.get<string>("nodeEnv")}`);
  });
}

bootstrap();
