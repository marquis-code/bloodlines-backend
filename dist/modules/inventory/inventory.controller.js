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
exports.InventoryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inventory_service_1 = require("./inventory.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const adjust_inventory_dto_1 = require("./dtos/adjust-inventory.dto");
const transfer_inventory_dto_1 = require("./dtos/transfer-inventory.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const role_enum_1 = require("../../common/enums/role.enum");
let InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async getInventory(user) {
        return this.inventoryService.getInventory(user.userId);
    }
    async adjustInventory(user, dto) {
        return this.inventoryService.adjustInventory(user.userId, dto);
    }
    async getInventoryHistory(user, paginationDto) {
        return this.inventoryService.getInventoryHistory(user.userId, paginationDto.page, paginationDto.limit);
    }
    async getInventoryAudit(user, paginationDto) {
        return this.inventoryService.getInventoryHistory(user.userId, paginationDto.page, paginationDto.limit);
    }
    async transferInventory(user, dto) {
        return this.inventoryService.transferInventory(user.userId, dto);
    }
    async getTransferHistory(user, paginationDto) {
        return this.inventoryService.getTransferHistory(user.userId, paginationDto.page, paginationDto.limit);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get current blood unit counts per type at user's facility" }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventory", null);
__decorate([
    (0, common_1.Post)("adjust"),
    (0, swagger_1.ApiOperation)({ summary: "Submit adjustment (received/used/wastage) with reason" }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, adjust_inventory_dto_1.AdjustInventoryDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "adjustInventory", null);
__decorate([
    (0, common_1.Get)("history"),
    (0, swagger_1.ApiOperation)({ summary: "Adjustment history (paginated)" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventoryHistory", null);
__decorate([
    (0, common_1.Get)("audit"),
    (0, swagger_1.ApiOperation)({ summary: "Inventory adjustment audit trail" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventoryAudit", null);
__decorate([
    (0, common_1.Post)("transfer"),
    (0, swagger_1.ApiOperation)({ summary: "Transfer units between facilities" }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transfer_inventory_dto_1.TransferInventoryDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "transferInventory", null);
__decorate([
    (0, common_1.Get)("transfer-history"),
    (0, swagger_1.ApiOperation)({ summary: "Transfer history" }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getTransferHistory", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)("Inventory"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("inventory"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.BRIDGER, role_enum_1.UserRole.PULSE_LEADER),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map