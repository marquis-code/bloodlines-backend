import { Controller, Get, Post, Body, UseGuards, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { BridgerService } from "./bridger.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { EmergencyAlertDto } from "./dtos/emergency-alert.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { UserRole } from "../../common/enums/role.enum";

@ApiTags("Bridger")
@ApiBearerAuth()
@Controller("bridger")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.BRIDGER)
export class BridgerController {
  constructor(private bridgerService: BridgerService) {}

  @Get("dashboard/stats")
  @ApiOperation({ summary: "Get Bridger dashboard statistics" })
  async getDashboardStats(@CurrentUser() user: any) {
    return this.bridgerService.getDashboardStats(user.userId);
  }

  @Get("donors")
  @ApiOperation({ summary: "Search for available donors" })
  async searchDonors(
    @CurrentUser() user: any, 
    @Query("bloodType") bloodType?: string,
    @Query("state") state?: string,
    @Query() paginationDto?: PaginationDto
  ) {
    return this.bridgerService.searchDonors(user.userId, bloodType, state, paginationDto?.page || 1, paginationDto?.limit || 10);
  }

  @Get("appointments")
  @ApiOperation({ summary: "Get facility appointments" })
  async getAppointments(@CurrentUser() user: any, @Query() paginationDto: PaginationDto) {
    return this.bridgerService.getAppointments(user.userId, paginationDto.page || 1, paginationDto.limit || 10);
  }

  @Post("emergency-alert")
  @ApiOperation({ summary: "Send emergency push notification to donors" })
  async sendEmergencyAlert(@CurrentUser() user: any, @Body() dto: EmergencyAlertDto) {
    return this.bridgerService.sendEmergencyAlert(user.userId, dto);
  }
}
