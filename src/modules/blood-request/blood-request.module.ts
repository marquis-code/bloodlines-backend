import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { BloodRequestService } from "./blood-request.service"
import { BloodRequestResolver } from "./blood-request.resolver"
import { BloodRequest, BloodRequestSchema } from "./schemas/blood-request.schema"
import { User, UserSchema } from "../user/schemas/user.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BloodRequest.name, schema: BloodRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [BloodRequestService, BloodRequestResolver],
  exports: [BloodRequestService],
})
export class BloodRequestModule {}
