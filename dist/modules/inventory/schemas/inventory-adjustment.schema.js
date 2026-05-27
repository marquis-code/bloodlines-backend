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
exports.InventoryAdjustmentSchema = exports.InventoryAdjustment = exports.AdjustmentType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
var AdjustmentType;
(function (AdjustmentType) {
    AdjustmentType["RECEIVED"] = "RECEIVED";
    AdjustmentType["USED"] = "USED";
    AdjustmentType["WASTED"] = "WASTED";
    AdjustmentType["MANUAL_ADJUSTMENT"] = "MANUAL_ADJUSTMENT";
})(AdjustmentType || (exports.AdjustmentType = AdjustmentType = {}));
let InventoryAdjustment = class InventoryAdjustment {
};
exports.InventoryAdjustment = InventoryAdjustment;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], InventoryAdjustment.prototype, "facilityName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: blood_group_enum_1.BloodGroup, required: true }),
    __metadata("design:type", String)
], InventoryAdjustment.prototype, "bloodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: AdjustmentType, required: true }),
    __metadata("design:type", String)
], InventoryAdjustment.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InventoryAdjustment.prototype, "units", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InventoryAdjustment.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventoryAdjustment.prototype, "adjustedBy", void 0);
exports.InventoryAdjustment = InventoryAdjustment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InventoryAdjustment);
exports.InventoryAdjustmentSchema = mongoose_1.SchemaFactory.createForClass(InventoryAdjustment);
//# sourceMappingURL=inventory-adjustment.schema.js.map