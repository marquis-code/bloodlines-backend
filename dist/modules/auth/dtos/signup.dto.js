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
exports.SignupDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const gender_enum_1 = require("../../../common/enums/gender.enum");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
const genotype_enum_1 = require("../../../common/enums/genotype.enum");
class SignupDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { fullName: { required: true, type: () => String }, gender: { required: true, enum: require("../../../common/enums/gender.enum").Gender }, phoneNumber: { required: true, type: () => String }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8, pattern: "/[A-Z]/" }, confirmPassword: { required: true, type: () => String }, bloodGroup: { required: false, enum: require("../../../common/enums/blood-group.enum").BloodGroup }, genotype: { required: false, enum: require("../../../common/enums/genotype.enum").Genotype }, location: { required: false, type: () => String }, address: { required: false, type: () => String }, city: { required: false, type: () => String }, state: { required: false, type: () => String }, country: { required: false, type: () => String }, lastDonationDate: { required: false, type: () => String } };
    }
}
exports.SignupDto = SignupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John Doe" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: gender_enum_1.Gender, example: gender_enum_1.Gender.MALE }),
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender),
    __metadata("design:type", String)
], SignupDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+2348012345678" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "john@example.com" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Pass123!@#" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: "Password must be at least 8 characters" }),
    (0, class_validator_1.Matches)(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }),
    (0, class_validator_1.Matches)(/[0-9]/, { message: "Password must contain at least one number" }),
    (0, class_validator_1.Matches)(/[!@#$%^&*]/, { message: "Password must contain at least one special character" }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Pass123!@#" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: blood_group_enum_1.BloodGroup, example: blood_group_enum_1.BloodGroup.O_POSITIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], SignupDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: genotype_enum_1.Genotype, example: genotype_enum_1.Genotype.AA }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(genotype_enum_1.Genotype),
    __metadata("design:type", String)
], SignupDto.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos, Nigeria" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "123 Street Name" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos State" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Nigeria" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2023-10-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "lastDonationDate", void 0);
//# sourceMappingURL=signup.dto.js.map