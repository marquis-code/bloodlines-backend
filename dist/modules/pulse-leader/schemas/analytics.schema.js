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
exports.OrganizationAnalyticsSchema = exports.OrganizationAnalytics = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrganizationAnalytics = class OrganizationAnalytics {
};
exports.OrganizationAnalytics = OrganizationAnalytics;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Organization', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrganizationAnalytics.prototype, "organizationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], OrganizationAnalytics.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrganizationAnalytics.prototype, "totalDonors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrganizationAnalytics.prototype, "activeDonors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrganizationAnalytics.prototype, "totalBloodRequests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrganizationAnalytics.prototype, "fulfilledBloodRequests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrganizationAnalytics.prototype, "escalatedRequests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrganizationAnalytics.prototype, "emergenciesHandled", void 0);
exports.OrganizationAnalytics = OrganizationAnalytics = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], OrganizationAnalytics);
exports.OrganizationAnalyticsSchema = mongoose_1.SchemaFactory.createForClass(OrganizationAnalytics);
//# sourceMappingURL=analytics.schema.js.map