import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { RoleUpgradeService } from "./role-upgrade.service"
import { RoleUpgradeController } from "./role-upgrade.controller"
import { RoleUpgradeRequest, RoleUpgradeRequestSchema } from "./schemas/request-role-upgrade.schema"
import { User, UserSchema } from "../user/schemas/user.schema"
import { EmailModule } from "../email/email.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoleUpgradeRequest.name, schema: RoleUpgradeRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
    EmailModule,
  ],
  providers: [RoleUpgradeService],
  controllers: [RoleUpgradeController],
  exports: [RoleUpgradeService],
})
export class RoleUpgradeModule { }

