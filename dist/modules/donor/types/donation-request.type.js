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
exports.DonationHistory = exports.DonationRequest = exports.DonationProgressUpdate = exports.DonationProgressStatusEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
const priority_level_enum_1 = require("../../../common/enums/priority-level.enum");
var DonationProgressStatusEnum;
(function (DonationProgressStatusEnum) {
    DonationProgressStatusEnum["ACCEPTED"] = "ACCEPTED";
    DonationProgressStatusEnum["ON_YOUR_WAY"] = "ON_YOUR_WAY";
    DonationProgressStatusEnum["ARRIVED_AT_HOSPITAL"] = "ARRIVED_AT_HOSPITAL";
    DonationProgressStatusEnum["DONATION_COMPLETE"] = "DONATION_COMPLETE";
    DonationProgressStatusEnum["CANCELLED"] = "CANCELLED";
})(DonationProgressStatusEnum || (exports.DonationProgressStatusEnum = DonationProgressStatusEnum = {}));
class DonationProgressUpdate {
}
exports.DonationProgressUpdate = DonationProgressUpdate;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "req_123" }),
    __metadata("design:type", String)
], DonationProgressUpdate.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DonationProgressStatusEnum, example: DonationProgressStatusEnum.ACCEPTED }),
    __metadata("design:type", String)
], DonationProgressUpdate.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T10:00:00Z" }),
    __metadata("design:type", Date)
], DonationProgressUpdate.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Hospital Main Entrance" }),
    __metadata("design:type", String)
], DonationProgressUpdate.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "30 minutes" }),
    __metadata("design:type", String)
], DonationProgressUpdate.prototype, "estimatedArrivalTime", void 0);
class DonationRequest {
}
exports.DonationRequest = DonationRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "req_123" }),
    __metadata("design:type", String)
], DonationRequest.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: blood_group_enum_1.BloodGroup, example: blood_group_enum_1.BloodGroup.A_POSITIVE }),
    __metadata("design:type", String)
], DonationRequest.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: priority_level_enum_1.PriorityLevel, example: priority_level_enum_1.PriorityLevel.URGENT }),
    __metadata("design:type", String)
], DonationRequest.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], DonationRequest.prototype, "unitsNeeded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mercy Hospital" }),
    __metadata("design:type", String)
], DonationRequest.prototype, "hospitalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123 Health St, Lagos" }),
    __metadata("design:type", String)
], DonationRequest.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+2348012345678" }),
    __metadata("design:type", String)
], DonationRequest.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Go to emergency ward" }),
    __metadata("design:type", String)
], DonationRequest.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T08:00:00Z" }),
    __metadata("design:type", Date)
], DonationRequest.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-02-21T09:00:00Z" }),
    __metadata("design:type", Date)
], DonationRequest.prototype, "acceptedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-02-21T09:30:00Z" }),
    __metadata("design:type", Date)
], DonationRequest.prototype, "rejectedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DonationProgressStatusEnum, example: DonationProgressStatusEnum.ACCEPTED }),
    __metadata("design:type", String)
], DonationRequest.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.2 }),
    __metadata("design:type", Number)
], DonationRequest.prototype, "distance", void 0);
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
    (0, swagger_1.ApiProperty)({ example: "2024-01-15T10:00:00Z" }),
    __metadata("design:type", Date)
], DonationHistory.prototype, "donatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: blood_group_enum_1.BloodGroup, example: blood_group_enum_1.BloodGroup.A_POSITIVE }),
    __metadata("design:type", String)
], DonationHistory.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], DonationHistory.prototype, "unitsGiven", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "COMPLETED" }),
    __metadata("design:type", String)
], DonationHistory.prototype, "status", void 0);
//# sourceMappingURL=donation-request.type.js.map