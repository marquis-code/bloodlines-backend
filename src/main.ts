import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import { HttpExceptionFilter } from "./common/filters/http-exception.filter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Get ConfigService instance
  const configService = app.get(ConfigService)

  // Enable CORS - Allow all origins
  app.enableCors({
    origin: true, // This allows all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  // Enable global exception filter
  app.useGlobalFilters(new HttpExceptionFilter())

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle("BloodLines API")
    .setDescription("The BloodLines complete backend REST API documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  const port = configService.get<number>("port") || 3001

  await app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`)
    console.log(`📖 Swagger API Docs: http://localhost:${port}/api`)
    console.log(`📊 Environment: ${configService.get<string>("nodeEnv")}`)
  })
}

bootstrap()