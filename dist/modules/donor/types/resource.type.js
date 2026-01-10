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
const graphql_1 = require("@nestjs/graphql");
var ResourceCategoryEnum;
(function (ResourceCategoryEnum) {
    ResourceCategoryEnum["ALL"] = "ALL";
    ResourceCategoryEnum["LATEST_NEWS"] = "LATEST_NEWS";
    ResourceCategoryEnum["ARTICLES"] = "ARTICLES";
    ResourceCategoryEnum["COURSES"] = "COURSES";
    ResourceCategoryEnum["EXPLAINER_VIDEOS"] = "EXPLAINER_VIDEOS";
    ResourceCategoryEnum["RESEARCH"] = "RESEARCH";
})(ResourceCategoryEnum || (exports.ResourceCategoryEnum = ResourceCategoryEnum = {}));
(0, graphql_1.registerEnumType)(ResourceCategoryEnum, {
    name: "ResourceCategoryEnum",
    description: "Categories for educational resources",
});
let Resource = class Resource {
};
exports.Resource = Resource;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Resource.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Resource.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Resource.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => ResourceCategoryEnum),
    __metadata("design:type", String)
], Resource.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Resource.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "duration", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Resource.prototype, "actionText", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Resource.prototype, "actionUrl", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Resource.prototype, "isFeatured", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Resource.prototype, "createdAt", void 0);
exports.Resource = Resource = __decorate([
    (0, graphql_1.ObjectType)()
], Resource);
let ResourcesPage = class ResourcesPage {
};
exports.ResourcesPage = ResourcesPage;
__decorate([
    (0, graphql_1.Field)(() => [Resource]),
    __metadata("design:type", Array)
], ResourcesPage.prototype, "resources", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ResourcesPage.prototype, "totalCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], ResourcesPage.prototype, "categories", void 0);
exports.ResourcesPage = ResourcesPage = __decorate([
    (0, graphql_1.ObjectType)()
], ResourcesPage);
//# sourceMappingURL=resource.type.js.map