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
exports.CompleteOnboardingDto = exports.OnboardingStep2Dto = exports.OnboardingStep1Dto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
const genotype_enum_1 = require("../../../common/enums/genotype.enum");
class OnboardingStep1Dto {
    static _OPENAPI_METADATA_FACTORY() {
        return { fullName: { required: true, type: () => String }, gender: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String } };
    }
}
exports.OnboardingStep1Dto = OnboardingStep1Dto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John Doe" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardingStep1Dto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Male" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardingStep1Dto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+2348012345678" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardingStep1Dto.prototype, "phoneNumber", void 0);
class OnboardingStep2Dto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, format: "email" }, bloodGroup: { required: true, enum: require("../../../common/enums/blood-group.enum").BloodGroup }, genotype: { required: false, enum: require("../../../common/enums/genotype.enum").Genotype }, location: { required: true, type: () => String }, lastDonationDate: { required: false, type: () => String } };
    }
}
exports.OnboardingStep2Dto = OnboardingStep2Dto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "john@example.com" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], OnboardingStep2Dto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: blood_group_enum_1.BloodGroup, example: blood_group_enum_1.BloodGroup.A_POSITIVE }),
    (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], OnboardingStep2Dto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: genotype_enum_1.Genotype, example: genotype_enum_1.Genotype.AA }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(genotype_enum_1.Genotype),
    __metadata("design:type", String)
], OnboardingStep2Dto.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Lagos, Nigeria" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnboardingStep2Dto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-01-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], OnboardingStep2Dto.prototype, "lastDonationDate", void 0);
class CompleteOnboardingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: true, type: () => String }, confirmPassword: { required: true, type: () => String } };
    }
}
exports.CompleteOnboardingDto = CompleteOnboardingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "password123" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteOnboardingDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "password123" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteOnboardingDto.prototype, "confirmPassword", void 0);
//# sourceMappingURL=onboarding.dto.js.map