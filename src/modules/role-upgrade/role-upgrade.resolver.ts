import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { RoleUpgradeService } from "./role-upgrade.service"
import { RoleUpgradeRequestType } from "./types/role-upgrade.type"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { UserRole } from "../../common/enums/role.enum"
import { CurrentUser } from "../auth/decorators/current-user.decorator" // You'll need this decorator

@Resolver(() => RoleUpgradeRequestType)
export class RoleUpgradeResolver {
  constructor(private roleUpgradeService: RoleUpgradeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => RoleUpgradeRequestType)
  async requestRoleUpgrade(
    @Args("requestedRole", { type: () => String }) requestedRole: UserRole,
    @Args("facilityName") facilityName: string,
    @Args("facilityAddress") facilityAddress: string,
    @Args("reason") reason: string,
    @CurrentUser() user: any,
  ) {
    return this.roleUpgradeService.requestRoleUpgrade(user.sub, {
      requestedRole,
      facilityName,
      facilityAddress,
      reason,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [RoleUpgradeRequestType])
  async getPendingUpgradeRequests(
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number,
    @Args("skip", { type: () => Number, defaultValue: 0 }) skip: number,
  ) {
    return this.roleUpgradeService.getPendingRequests(limit, skip)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async approveRoleUpgrade(
    @Args("requestId") requestId: string,
    @CurrentUser() user: any,
  ) {
    await this.roleUpgradeService.approveUpgrade(requestId, user.sub)
    return "Role upgrade approved successfully"
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async rejectRoleUpgrade(
    @Args("requestId") requestId: string,
    @Args("rejectionReason") rejectionReason: string,
    @CurrentUser() user: any,
  ) {
    await this.roleUpgradeService.rejectUpgrade(requestId, user.sub, rejectionReason)
    return "Role upgrade rejected successfully"
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [RoleUpgradeRequestType])
  async getMyUpgradeHistory(@CurrentUser() user: any) {
    return this.roleUpgradeService.getUserUpgradeHistory(user.sub)
  }
}