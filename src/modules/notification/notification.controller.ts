import { Controller, Get, Put, Body, Param, UseGuards, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { UpdateNotificationPreferencesDto } from "./dtos/update-notification-preferences.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";

@ApiTags("Notifications")
@ApiBearerAuth()
@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get("preferences")
  @ApiOperation({ summary: "Get user notification settings" })
  async getPreferences(@CurrentUser() user: any) {
    return this.notificationService.getPreferences(user.userId);
  }

  @Put("preferences")
  @ApiOperation({ summary: "Update notification preferences" })
  async updatePreferences(
    @CurrentUser() user: any,
    @Body() updateDto: UpdateNotificationPreferencesDto,
  ) {
    return this.notificationService.updatePreferences(user.userId, updateDto);
  }

  @Get()
  @ApiOperation({ summary: "Get user's notification history (paginated)" })
  async getHistory(@CurrentUser() user: any, @Query() paginationDto: PaginationDto) {
    return this.notificationService.getHistory(user.userId, paginationDto.page, paginationDto.limit);
  }

  @Put(":id/read")
  @ApiOperation({ summary: "Mark a specific notification as read" })
  async markRead(@CurrentUser() user: any, @Param("id") id: string) {
    return this.notificationService.markRead(user.userId, id);
  }

  @Put("read-all")
  @ApiOperation({ summary: "Mark all notifications as read" })
  async markAllRead(@CurrentUser() user: any) {
    return this.notificationService.markAllRead(user.userId);
  }
}
