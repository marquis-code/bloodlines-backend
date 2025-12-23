import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnalyticsService } from "./analytics.service"
import { AnalyticsResolver } from "./analytics.resolver"
import { BloodRequest, BloodRequestSchema } from "../blood-request/schemas/blood-request.schema"
import { User, UserSchema } from "../user/schemas/user.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BloodRequest.name, schema: BloodRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [AnalyticsService, AnalyticsResolver],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
