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
const graphql_1 = require("@nestjs/graphql");
let RoleUpgradeRequestType = class RoleUpgradeRequestType {
};
exports.RoleUpgradeRequestType = RoleUpgradeRequestType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "requestedRole", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "facilityName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "facilityAddress", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "reason", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "reviewedBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "reviewDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "rejectionReason", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoleUpgradeRequestType.prototype, "updatedAt", void 0);
exports.RoleUpgradeRequestType = RoleUpgradeRequestType = __decorate([
    (0, graphql_1.ObjectType)()
], RoleUpgradeRequestType);
//# sourceMappingURL=role-upgrade.type.js.map