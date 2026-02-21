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
exports.ResourcesPage = exports.Resource = exports.ResourceCategoryEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
var ResourceCategoryEnum;
(function (ResourceCategoryEnum) {
    ResourceCategoryEnum["ALL"] = "ALL";
    ResourceCategoryEnum["LATEST_NEWS"] = "LATEST_NEWS";
    ResourceCategoryEnum["ARTICLES"] = "ARTICLES";
    ResourceCategoryEnum["COURSES"] = "COURSES";
    ResourceCategoryEnum["EXPLAINER_VIDEOS"] = "EXPLAINER_VIDEOS";
    ResourceCategoryEnum["RESEARCH"] = "RESEARCH";
})(ResourceCategoryEnum || (exports.ResourceCategoryEnum = ResourceCategoryEnum = {}));
class Resource {
}
exports.Resource = Resource;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "res_123" }),
    __metadata("design:type", String)
], Resource.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "How to prepare for your first donation" }),
    __metadata("design:type", String)
], Resource.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A comprehensive guide for new donors." }),
    __metadata("design:type", String)
], Resource.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ResourceCategoryEnum, example: ResourceCategoryEnum.ARTICLES }),
    __metadata("design:type", String)
], Resource.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://example.com/image.jpg" }),
    __metadata("design:type", String)
], Resource.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "5 mins" }),
    __metadata("design:type", String)
], Resource.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Read More" }),
    __metadata("design:type", String)
], Resource.prototype, "actionText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://example.com/article" }),
    __metadata("design:type", String)
], Resource.prototype, "actionUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T10:00:00Z" }),
    __metadata("design:type", Date)
], Resource.prototype, "createdAt", void 0);
class ResourcesPage {
}
exports.ResourcesPage = ResourcesPage;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Resource] }),
    __metadata("design:type", Array)
], ResourcesPage.prototype, "resources", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45 }),
    __metadata("design:type", Number)
], ResourcesPage.prototype, "totalCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ["LATEST_NEWS", "ARTICLES"] }),
    __metadata("design:type", Array)
], ResourcesPage.prototype, "categories", void 0);
//# sourceMappingURL=resource.type.js.map