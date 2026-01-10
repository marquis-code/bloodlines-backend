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
exports.DonationHistory = exports.DonationRequest = exports.DonationProgressUpdate = exports.DonationProgressStatusEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
const priority_level_enum_1 = require("../../../common/enums/priority-level.enum");
(0, graphql_1.registerEnumType)(blood_group_enum_1.BloodGroup, {
    name: "BloodGroup",
});
(0, graphql_1.registerEnumType)(priority_level_enum_1.PriorityLevel, {
    name: "PriorityLevel",
});
var DonationProgressStatusEnum;
(function (DonationProgressStatusEnum) {
    DonationProgressStatusEnum["ACCEPTED"] = "ACCEPTED";
    DonationProgressStatusEnum["ON_YOUR_WAY"] = "ON_YOUR_WAY";
    DonationProgressStatusEnum["ARRIVED_AT_HOSPITAL"] = "ARRIVED_AT_HOSPITAL";
    DonationProgressStatusEnum["DONATION_COMPLETE"] = "DONATION_COMPLETE";
    DonationProgressStatusEnum["CANCELLED"] = "CANCELLED";
})(DonationProgressStatusEnum || (exports.DonationProgressStatusEnum = DonationProgressStatusEnum = {}));
(0, graphql_1.registerEnumType)(DonationProgressStatusEnum, {
    name: "DonationProgressStatusEnum",
});
let DonationProgressUpdate = class DonationProgressUpdate {
};
exports.DonationProgressUpdate = DonationProgressUpdate;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationProgressUpdate.prototype, "requestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => DonationProgressStatusEnum),
    __metadata("design:type", String)
], DonationProgressUpdate.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DonationProgressUpdate.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DonationProgressUpdate.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DonationProgressUpdate.prototype, "estimatedArrivalTime", void 0);
exports.DonationProgressUpdate = DonationProgressUpdate = __decorate([
    (0, graphql_1.ObjectType)()
], DonationProgressUpdate);
let DonationRequest = class DonationRequest {
};
exports.DonationRequest = DonationRequest;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationRequest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], DonationRequest.prototype, "bloodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => priority_level_enum_1.PriorityLevel),
    __metadata("design:type", String)
], DonationRequest.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DonationRequest.prototype, "unitsNeeded", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationRequest.prototype, "hospitalName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationRequest.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationRequest.prototype, "contactPhone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationRequest.prototype, "instructions", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DonationRequest.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], DonationRequest.prototype, "acceptedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], DonationRequest.prototype, "rejectedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => DonationProgressStatusEnum),
    __metadata("design:type", String)
], DonationRequest.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DonationRequest.prototype, "distance", void 0);
exports.DonationRequest = DonationRequest = __decorate([
    (0, graphql_1.ObjectType)()
], DonationRequest);
let DonationHistory = class DonationHistory {
};
exports.DonationHistory = DonationHistory;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationHistory.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationHistory.prototype, "hospitalName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DonationHistory.prototype, "donatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], DonationHistory.prototype, "bloodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DonationHistory.prototype, "unitsGiven", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonationHistory.prototype, "status", void 0);
exports.DonationHistory = DonationHistory = __decorate([
    (0, graphql_1.ObjectType)()
], DonationHistory);
//# sourceMappingURL=donation-request.type.js.map