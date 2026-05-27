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
exports.EmergencyAlertDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
class EmergencyAlertDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { targetBloodGroups: { required: true, enum: require("../../../common/enums/blood-group.enum").BloodGroup, isArray: true }, message: { required: true, type: () => String } };
    }
}
exports.EmergencyAlertDto = EmergencyAlertDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], enum: blood_group_enum_1.BloodGroup }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup, { each: true }),
    __metadata("design:type", Array)
], EmergencyAlertDto.prototype, "targetBloodGroups", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmergencyAlertDto.prototype, "message", void 0);
//# sourceMappingURL=emergency-alert.dto.js.map