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
exports.BloodRequestSchema = exports.BloodRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blood_type_enum_1 = require("../../../common/enums/blood-type.enum");
const priority_level_enum_1 = require("../../../common/enums/priority-level.enum");
const request_status_enum_1 = require("../../../common/enums/request-status.enum");
const donor_response_enum_1 = require("../../../common/enums/donor-response.enum");
let BloodRequest = class BloodRequest {
};
exports.BloodRequest = BloodRequest;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: blood_type_enum_1.BloodType, required: true }),
    __metadata("design:type", String)
], BloodRequest.prototype, "bloodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: priority_level_enum_1.PriorityLevel, required: true }),
    __metadata("design:type", String)
], BloodRequest.prototype, "priorityLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], BloodRequest.prototype, "unitsNeeded", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BloodRequest.prototype, "contactPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BloodRequest.prototype, "additionalNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: request_status_enum_1.RequestStatus, default: request_status_enum_1.RequestStatus.PENDING }),
    __metadata("design:type", String)
], BloodRequest.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BloodRequest.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: "User" }]),
    __metadata("design:type", Array)
], BloodRequest.prototype, "assignedDonors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: donor_response_enum_1.DonorResponse, default: donor_response_enum_1.DonorResponse.NO_RESPONSE }),
    __metadata("design:type", String)
], BloodRequest.prototype, "donorResponseStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BloodRequest.prototype, "fulfillmentDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BloodRequest.prototype, "unitsConfirmed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BloodRequest.prototype, "unitsEscalated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BloodRequest.prototype, "unitsNoResponse", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BloodRequest.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], BloodRequest.prototype, "updatedAt", void 0);
exports.BloodRequest = BloodRequest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BloodRequest);
exports.BloodRequestSchema = mongoose_1.SchemaFactory.createForClass(BloodRequest);
//# sourceMappingURL=blood-request.schema.js.map