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
exports.BroadcastMessageDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class BroadcastMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { requestId: { required: true, type: () => String }, messageContent: { required: true, type: () => String }, recipientDonorIds: { required: false, type: () => [String] }, bloodType: { required: false, type: () => String }, coordinates: { required: false }, radiusKm: { required: false, type: () => Number }, broadcastMethod: { required: false, type: () => String } };
    }
}
exports.BroadcastMessageDto = BroadcastMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "req_123" }),
    __metadata("design:type", String)
], BroadcastMessageDto.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Lagos pulse leaders: We need A+ blood at Mercy Hospital urgently!" }),
    __metadata("design:type", String)
], BroadcastMessageDto.prototype, "messageContent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ["donor_1", "donor_2"] }),
    __metadata("design:type", Array)
], BroadcastMessageDto.prototype, "recipientDonorIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "A+" }),
    __metadata("design:type", String)
], BroadcastMessageDto.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [Number], example: [6.5244, 3.3792] }),
    __metadata("design:type", Array)
], BroadcastMessageDto.prototype, "coordinates", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    __metadata("design:type", Number)
], BroadcastMessageDto.prototype, "radiusKm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "BOTH" }),
    __metadata("design:type", String)
], BroadcastMessageDto.prototype, "broadcastMethod", void 0);
//# sourceMappingURL=broadcast-message.dto.js.map