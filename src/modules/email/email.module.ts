import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { EmailService } from "./email.service"

@Module({
  imports: [ConfigModule.forRoot()], // Changed from ConfigModule to ConfigModule.forRoot()
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}