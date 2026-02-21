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
exports.SearchDonorsFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SearchDonorsFilterDto {
}
exports.SearchDonorsFilterDto = SearchDonorsFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "A+" }),
    __metadata("design:type", String)
], SearchDonorsFilterDto.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50 }),
    __metadata("design:type", Number)
], SearchDonorsFilterDto.prototype, "radiusKm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "AVAILABLE" }),
    __metadata("design:type", String)
], SearchDonorsFilterDto.prototype, "availability", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    __metadata("design:type", Number)
], SearchDonorsFilterDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    __metadata("design:type", Number)
], SearchDonorsFilterDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [6.5244, 3.3792] }),
    __metadata("design:type", Array)
], SearchDonorsFilterDto.prototype, "coordinates", void 0);
//# sourceMappingURL=search-donors.dto.js.map