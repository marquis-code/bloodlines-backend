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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUpgradeRequestType = void 0;
const swagger_1 = require("@nestjs/swagger");
class RoleUpgradeRequestType {
}
exports.RoleUpgradeRequestType = RoleUpgradeRequestType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "role_123" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user_123" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "PULSE_LEADER" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "requestedRole", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mercy Hospital" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "facilityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123 Health St" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "facilityAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Want to coordinate more donations" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "PENDING" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "admin_123" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "reviewedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-02-21T10:00:00Z" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "reviewDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Insufficient information" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T08:00:00Z" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T08:00:00Z" }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "updatedAt", void 0);
//# sourceMappingURL=role-upgrade.type.js.map