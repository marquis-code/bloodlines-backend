"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_service_1 = require("./notification.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const update_notification_preferences_dto_1 = require("./dtos/update-notification-preferences.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getPreferences(user) {
        return this.notificationService.getPreferences(user.userId);
    }
    async updatePreferences(user, updateDto) {
        return this.notificationService.updatePreferences(user.userId, updateDto);
    }
    async getHistory(user, paginationDto) {
        return this.notificationService.getHistory(user.userId, paginationDto.page, paginationDto.limit);
    }
    async markRead(user, id) {
        return this.notificationService.markRead(user.userId, id);
    }
    async markAllRead(user) {
        return this.notificationService.markAllRead(user.userId);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)("preferences"),
    (0, swagger_1.ApiOperation)({ summary: "Get user notification settings" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getPreferences", null);
__decorate([
    (0, common_1.Put)("preferences"),
    (0, swagger_1.ApiOperation)({ summary: "Update notification preferences" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_notification_preferences_dto_1.UpdateNotificationPreferencesDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "updatePreferences", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get user's notification history (paginated)" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Put)(":id/read"),
    (0, swagger_1.ApiOperation)({ summary: "Mark a specific notification as read" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markRead", null);
__decorate([
    (0, common_1.Put)("read-all"),
    (0, swagger_1.ApiOperation)({ summary: "Mark all notifications as read" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllRead", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)("Notifications"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("notifications"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map