import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { JwtModule } from "@nestjs/jwt"
import { BloodRequestService } from "./blood-request.service"
import { BloodRequestController } from "./blood-request.controller"
import { BloodRequestGateway } from "./blood-request.gateway"
import { BloodRequest, BloodRequestSchema } from "./schema/blood-request.schema"
import { User, UserSchema } from "../user/schemas/user.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BloodRequest.name, schema: BloodRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule,
  ],
  providers: [BloodRequestService, BloodRequestGateway],
  controllers: [BloodRequestController],
  exports: [BloodRequestService, BloodRequestGateway],
})
export class BloodRequestModule { }