import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { NotificationGateway } from "./notification.gateway"
import { NotificationService } from "./notification.service"
import { NotificationController } from "./notification.controller"
import { User, UserSchema } from "../user/schemas/user.schema"
import { Notification, NotificationSchema } from "./schemas/notification.schema"
import { NotificationPreference, NotificationPreferenceSchema } from "./schemas/notification-preference.schema"
import { EmailModule } from "../email/email.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: NotificationPreference.name, schema: NotificationPreferenceSchema },
    ]),
    EmailModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationGateway, NotificationService],
  exports: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
