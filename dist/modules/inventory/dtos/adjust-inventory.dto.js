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
exports.AdjustInventoryDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
const inventory_adjustment_schema_1 = require("../schemas/inventory-adjustment.schema");
class AdjustInventoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { bloodType: { required: true, enum: require("../../../common/enums/blood-group.enum").BloodGroup }, type: { required: true, enum: require("../schemas/inventory-adjustment.schema").AdjustmentType }, units: { required: true, type: () => Number, minimum: 1 }, reason: { required: false, type: () => String } };
    }
}
exports.AdjustInventoryDto = AdjustInventoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: blood_group_enum_1.BloodGroup }),
    (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], AdjustInventoryDto.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: inventory_adjustment_schema_1.AdjustmentType }),
    (0, class_validator_1.IsEnum)(inventory_adjustment_schema_1.AdjustmentType),
    __metadata("design:type", String)
], AdjustInventoryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AdjustInventoryDto.prototype, "units", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdjustInventoryDto.prototype, "reason", void 0);
//# sourceMappingURL=adjust-inventory.dto.js.map