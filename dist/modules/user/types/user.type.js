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
exports.UserType = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserType {
}
exports.UserType = UserType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user_123" }),
    __metadata("design:type", String)
], UserType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user@example.com" }),
    __metadata("design:type", String)
], UserType.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John Doe" }),
    __metadata("design:type", String)
], UserType.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Male" }),
    __metadata("design:type", String)
], UserType.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+2348012345678" }),
    __metadata("design:type", String)
], UserType.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], UserType.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "AA" }),
    __metadata("design:type", String)
], UserType.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos, Nigeria" }),
    __metadata("design:type", String)
], UserType.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], UserType.prototype, "lastDonationDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "123 Street Name" }),
    __metadata("design:type", String)
], UserType.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos" }),
    __metadata("design:type", String)
], UserType.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos State" }),
    __metadata("design:type", String)
], UserType.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Nigeria" }),
    __metadata("design:type", String)
], UserType.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { type: "Point", coordinates: [3.3792, 6.5244] },
    }),
    __metadata("design:type", Object)
], UserType.prototype, "geoLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserType.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Jane Doe" }),
    __metadata("design:type", String)
], UserType.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+2348098765432" }),
    __metadata("design:type", String)
], UserType.prototype, "emergencyContactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserType.prototype, "emailNotifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserType.prototype, "smsNotifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserType.prototype, "pushNotifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserType.prototype, "emailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "DONOR" }),
    __metadata("design:type", String)
], UserType.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Mercy Hospital" }),
    __metadata("design:type", String)
], UserType.prototype, "facilityName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "123 Health St" }),
    __metadata("design:type", String)
], UserType.prototype, "facilityAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], UserType.prototype, "donationCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserType.prototype, "agreedToDonate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserType.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01T00:00:00Z" }),
    __metadata("design:type", String)
], UserType.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01T00:00:00Z" }),
    __metadata("design:type", String)
], UserType.prototype, "updatedAt", void 0);
//# sourceMappingURL=user.type.js.map