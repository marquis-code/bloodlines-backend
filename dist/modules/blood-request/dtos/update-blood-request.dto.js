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
exports.UpdateBloodRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const priority_level_enum_1 = require("../../../common/enums/priority-level.enum");
const request_status_enum_1 = require("../../../common/enums/request-status.enum");
class UpdateBloodRequestDto {
}
exports.UpdateBloodRequestDto = UpdateBloodRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: priority_level_enum_1.PriorityLevel, example: priority_level_enum_1.PriorityLevel.URGENT }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(priority_level_enum_1.PriorityLevel),
    __metadata("design:type", String)
], UpdateBloodRequestDto.prototype, "priorityLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateBloodRequestDto.prototype, "unitsNeeded", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+2348012345678" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBloodRequestDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Updated patient notes" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBloodRequestDto.prototype, "additionalNotes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: request_status_enum_1.RequestStatus, example: request_status_enum_1.RequestStatus.PENDING }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(request_status_enum_1.RequestStatus),
    __metadata("design:type", String)
], UpdateBloodRequestDto.prototype, "status", void 0);
//# sourceMappingURL=update-blood-request.dto.js.map