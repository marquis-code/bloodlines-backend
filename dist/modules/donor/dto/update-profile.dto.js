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
exports.UpdateProfileInput = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
const genotype_enum_1 = require("../../../common/enums/genotype.enum");
const gender_enum_1 = require("../../../common/enums/gender.enum");
class UpdateProfileInput {
    static _OPENAPI_METADATA_FACTORY() {
        return { fullName: { required: false, type: () => String }, phoneNumber: { required: false, type: () => String }, bloodGroup: { required: false, enum: require("../../../common/enums/blood-group.enum").BloodGroup }, genotype: { required: false, type: () => String }, gender: { required: false, type: () => String }, latitude: { required: false, type: () => Number }, longitude: { required: false, type: () => Number }, location: { required: false, type: () => String }, address: { required: false, type: () => String }, city: { required: false, type: () => String }, state: { required: false, type: () => String }, country: { required: false, type: () => String }, lastDonationDate: { required: false, type: () => String }, isAvailable: { required: false, type: () => Boolean }, emergencyContact: { required: false, type: () => String }, emergencyContactPhone: { required: false, type: () => String } };
    }
}
exports.UpdateProfileInput = UpdateProfileInput;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "John Doe" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+2348012345678" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: blood_group_enum_1.BloodGroup, example: blood_group_enum_1.BloodGroup.O_POSITIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: genotype_enum_1.Genotype, example: genotype_enum_1.Genotype.AA }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(genotype_enum_1.Genotype),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: gender_enum_1.Gender, example: gender_enum_1.Gender.MALE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 6.5244 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProfileInput.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3.3792 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProfileInput.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos, Nigeria" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "123 Street Name" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos State" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Nigeria" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2023-10-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "lastDonationDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProfileInput.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Jane Doe" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+2348098765432" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "emergencyContactPhone", void 0);
//# sourceMappingURL=update-profile.dto.js.map