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
exports.SetGoalDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SetGoalDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { target: { required: true, type: () => Number, minimum: 1 }, year: { required: true, type: () => Number, minimum: 2020 } };
    }
}
exports.SetGoalDto = SetGoalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SetGoalDto.prototype, "target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2024 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(2020),
    __metadata("design:type", Number)
], SetGoalDto.prototype, "year", void 0);
//# sourceMappingURL=set-goal.dto.js.map