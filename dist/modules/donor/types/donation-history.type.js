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
exports.DonationHistory = void 0;
const swagger_1 = require("@nestjs/swagger");
class DonationHistory {
}
exports.DonationHistory = DonationHistory;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "hist_123" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "City Hospital" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "hospitalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], DonationHistory.prototype, "unitsGiven", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-15T10:00:00Z" }),
    __metadata("design:type", Date)
], DonationHistory.prototype, "donatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "DONATED" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mercy Clinic" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "facilityName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "123 Clinic Rd" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "facilityAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+2348000000000" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "facilityPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Smooth experience" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "donorFeedback", void 0);
//# sourceMappingURL=donation-history.type.js.map