import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { RoleUpgradeService } from "./role-upgrade.service"
import { RoleUpgradeResolver } from "./role-upgrade.resolver"
import { RoleUpgradeRequest, RoleUpgradeRequestSchema } from "./schemas/role-upgrade-request.schema"
import { User, UserSchema } from "../user/schemas/user.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoleUpgradeRequest.name, schema: RoleUpgradeRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [RoleUpgradeService, RoleUpgradeResolver],
  exports: [RoleUpgradeService],
})
export class RoleUpgradeModule {}
