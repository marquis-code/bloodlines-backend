import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { DonorService } from "./donor.service"
import { DonorResolver } from "./donor.resolver"
import { User, UserSchema } from "../user/schemas/user.schema"
import { BloodRequest, BloodRequestSchema } from "../blood-request/schema/blood-request.schema"
import { NotificationModule } from "../notification/notification.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BloodRequest.name, schema: BloodRequestSchema },
    ]),
    NotificationModule,
  ],
  providers: [DonorService, DonorResolver],
  exports: [DonorService],
})
export class DonorModule {}
