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
exports.BloodRequestType = void 0;
const graphql_1 = require("@nestjs/graphql");
let BloodRequestType = class BloodRequestType {
};
exports.BloodRequestType = BloodRequestType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "bloodType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "priorityLevel", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BloodRequestType.prototype, "unitsNeeded", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "contactPhone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "additionalNotes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], BloodRequestType.prototype, "assignedDonors", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "donorResponseStatus", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BloodRequestType.prototype, "fulfillmentDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BloodRequestType.prototype, "unitsConfirmed", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BloodRequestType.prototype, "unitsEscalated", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BloodRequestType.prototype, "unitsNoResponse", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BloodRequestType.prototype, "updatedAt", void 0);
exports.BloodRequestType = BloodRequestType = __decorate([
    (0, graphql_1.ObjectType)()
], BloodRequestType);
//# sourceMappingURL=blood-request.type.js.map