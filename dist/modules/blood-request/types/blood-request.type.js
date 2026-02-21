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
exports.BloodRequestType = void 0;
const swagger_1 = require("@nestjs/swagger");
class BloodRequestType {
}
exports.BloodRequestType = BloodRequestType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "req_123" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "URGENT" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "priorityLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], BloodRequestType.prototype, "unitsNeeded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+2348012345678" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Urgent need for O- blood" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "additionalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "PENDING" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user_123" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ["donor_1", "donor_2"] }),
    __metadata("design:type", Array)
], BloodRequestType.prototype, "assignedDonors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "WAITING" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "donorResponseStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-02-21T10:00:00Z" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "fulfillmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], BloodRequestType.prototype, "unitsConfirmed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], BloodRequestType.prototype, "unitsEscalated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], BloodRequestType.prototype, "unitsNoResponse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T08:00:00Z" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T08:00:00Z" }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "updatedAt", void 0);
//# sourceMappingURL=blood-request.type.js.map