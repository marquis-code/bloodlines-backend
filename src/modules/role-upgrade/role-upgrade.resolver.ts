import { Resolver, Query, Mutation } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import type { RoleUpgradeService } from "./role-upgrade.service"
import { RoleUpgradeRequestType } from "./types/role-upgrade.type"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"

@Resolver(() => RoleUpgradeRequestType)
export class RoleUpgradeResolver {
  constructor(private roleUpgradeService: RoleUpgradeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => RoleUpgradeRequestType)
  async requestRoleUpgrade(
    requestedRole: string,
    facilityName: string,
    facilityAddress: string,
    reason: string,
    user: any,
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
  async getPendingUpgradeRequests(limit: number, skip: number) {
    return this.roleUpgradeService.getPendingRequests(limit, skip)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async approveRoleUpgrade(requestId: string, user: any) {
    await this.roleUpgradeService.approveUpgrade(requestId, user.sub)
    return "Role upgrade approved successfully"
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async rejectRoleUpgrade(requestId: string, rejectionReason: string, user: any) {
    await this.roleUpgradeService.rejectUpgrade(requestId, user.sub, rejectionReason)
    return "Role upgrade rejected successfully"
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [RoleUpgradeRequestType])
  async getMyUpgradeHistory(user: any) {
    return this.roleUpgradeService.getUserUpgradeHistory(user.sub)
  }
}
