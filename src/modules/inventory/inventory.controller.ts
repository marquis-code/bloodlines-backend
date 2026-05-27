import { Controller, Get, Post, Body, UseGuards, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { InventoryService } from "./inventory.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { AdjustInventoryDto } from "./dtos/adjust-inventory.dto";
import { TransferInventoryDto } from "./dtos/transfer-inventory.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { UserRole } from "../../common/enums/role.enum";

@ApiTags("Inventory")
@ApiBearerAuth()
@Controller("inventory")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.BRIDGER, UserRole.PULSE_LEADER)
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: "Get current blood unit counts per type at user's facility" })
  async getInventory(@CurrentUser() user: any) {
    return this.inventoryService.getInventory(user.userId);
  }

  @Post("adjust")
  @ApiOperation({ summary: "Submit adjustment (received/used/wastage) with reason" })
  async adjustInventory(@CurrentUser() user: any, @Body() dto: AdjustInventoryDto) {
    return this.inventoryService.adjustInventory(user.userId, dto);
  }

  @Get("history")
  @ApiOperation({ summary: "Adjustment history (paginated)" })
  async getInventoryHistory(@CurrentUser() user: any, @Query() paginationDto: PaginationDto) {
    return this.inventoryService.getInventoryHistory(user.userId, paginationDto.page, paginationDto.limit);
  }

  @Get("audit")
  @ApiOperation({ summary: "Inventory adjustment audit trail" })
  async getInventoryAudit(@CurrentUser() user: any, @Query() paginationDto: PaginationDto) {
    return this.inventoryService.getInventoryHistory(user.userId, paginationDto.page, paginationDto.limit);
  }

  @Post("transfer")
  @ApiOperation({ summary: "Transfer units between facilities" })
  async transferInventory(@CurrentUser() user: any, @Body() dto: TransferInventoryDto) {
    return this.inventoryService.transferInventory(user.userId, dto);
  }

  @Get("transfer-history")
  @ApiOperation({ summary: "Transfer history" })
  async getTransferHistory(@CurrentUser() user: any, @Query() paginationDto: PaginationDto) {
    return this.inventoryService.getTransferHistory(user.userId, paginationDto.page, paginationDto.limit);
  }
}
