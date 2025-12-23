import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { AppModule } from "./app.module"

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

  const port = configService.get<number>("port") || 3001
  
  await app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`)
    console.log(`🎮 GraphQL Playground: http://localhost:${port}/graphql`)
    console.log(`📊 Environment: ${configService.get<string>("nodeEnv")}`)
  })
}

bootstrap()