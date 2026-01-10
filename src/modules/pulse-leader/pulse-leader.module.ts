import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PulseLeaderService } from "./pulse-leader.service"
import { PulseLeaderResolver } from "./pulse-leader.resolver"
import { BloodRequest, BloodRequestSchema } from "../blood-request/schema/blood-request.schema"
import { User, UserSchema } from "../user/schemas/user.schema"
import { NotificationModule } from "../notification/notification.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BloodRequest.name, schema: BloodRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
    NotificationModule,
  ],
  providers: [PulseLeaderService, PulseLeaderResolver],
  exports: [PulseLeaderService],
})
export class PulseLeaderModule {}
