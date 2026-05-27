import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PulseLeaderService } from "./pulse-leader.service"
import { PulseLeaderController } from "./pulse-leader.controller"
import { BloodRequest, BloodRequestSchema } from "../blood-request/schema/blood-request.schema"
import { User, UserSchema } from "../user/schemas/user.schema"
import { Organization, OrganizationSchema } from "./schemas/organization.schema"
import { Campaign, CampaignSchema } from "./schemas/campaign.schema"
import { Inventory, InventorySchema } from "../inventory/schemas/inventory.schema"
import { OrganizationAnalytics, OrganizationAnalyticsSchema } from "./schemas/analytics.schema"
import { NotificationModule } from "../notification/notification.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BloodRequest.name, schema: BloodRequestSchema },
      { name: User.name, schema: UserSchema },
      { name: Organization.name, schema: OrganizationSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: OrganizationAnalytics.name, schema: OrganizationAnalyticsSchema },
    ]),
    NotificationModule,
  ],
  providers: [PulseLeaderService],
  controllers: [PulseLeaderController],
  exports: [PulseLeaderService],
})
export class PulseLeaderModule { }

