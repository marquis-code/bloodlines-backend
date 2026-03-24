import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { NotificationGateway } from "./notification.gateway"
import { NotificationService } from "./notification.service"
import { User, UserSchema } from "../user/schemas/user.schema"
import { EmailModule } from "../email/email.module"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EmailModule,
  ],
  providers: [NotificationGateway, NotificationService],
  exports: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
