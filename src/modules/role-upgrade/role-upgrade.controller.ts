import { Controller, Get, Post, Body, Query, UseGuards, Param } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { RoleUpgradeService } from "./role-upgrade.service"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { UserRole } from "../../common/enums/role.enum"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@ApiTags("Role Upgrades")
@ApiBearerAuth()
@Controller("role-upgrades")
@UseGuards(JwtAuthGuard)
export class RoleUpgradeController {

    constructor(private roleUpgradeService: RoleUpgradeService) { }

    @Post("request")
    async requestRoleUpgrade(
        @Body() body: {
            requestedRole: UserRole
            facilityName: string
            facilityAddress: string
            reason: string
        },
        @CurrentUser() user: any,
    ) {
        return this.roleUpgradeService.requestRoleUpgrade(user.userId, body)
    }

    @Get("pending")
    async getPendingUpgradeRequests(
        @Query("limit") limit = 10,
        @Query("skip") skip = 0,
    ) {
        return this.roleUpgradeService.getPendingRequests(Number(limit), Number(skip))
    }

    @Post(":requestId/approve")
    async approveRoleUpgrade(
        @Param("requestId") requestId: string,
        @CurrentUser() user: any,
    ) {
        await this.roleUpgradeService.approveUpgrade(requestId, user.userId)
        return { message: "Role upgrade approved successfully" }
    }

    @Post(":requestId/reject")
    async rejectRoleUpgrade(
        @Param("requestId") requestId: string,
        @Body("rejectionReason") rejectionReason: string,
        @CurrentUser() user: any,
    ) {
        await this.roleUpgradeService.rejectUpgrade(requestId, user.userId, rejectionReason)
        return { message: "Role upgrade rejected successfully" }
    }

    @Get("my-history")
    async getMyUpgradeHistory(@CurrentUser() user: any) {
        return this.roleUpgradeService.getUserUpgradeHistory(user.userId)
    }
}
