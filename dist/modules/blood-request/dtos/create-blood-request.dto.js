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
exports.CreateBloodRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
const priority_level_enum_1 = require("../../../common/enums/priority-level.enum");
class CreateBloodRequestDto {
}
exports.CreateBloodRequestDto = CreateBloodRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: blood_group_enum_1.BloodGroup, example: blood_group_enum_1.BloodGroup.A_POSITIVE }),
    (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], CreateBloodRequestDto.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: priority_level_enum_1.PriorityLevel, example: priority_level_enum_1.PriorityLevel.URGENT }),
    (0, class_validator_1.IsEnum)(priority_level_enum_1.PriorityLevel),
    __metadata("design:type", String)
], CreateBloodRequestDto.prototype, "priorityLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateBloodRequestDto.prototype, "unitsNeeded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+2348012345678" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBloodRequestDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Patient needs blood for surgery" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBloodRequestDto.prototype, "additionalNotes", void 0);
//# sourceMappingURL=create-blood-request.dto.js.map