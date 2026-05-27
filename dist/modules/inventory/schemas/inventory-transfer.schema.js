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
exports.InventoryTransferSchema = exports.InventoryTransfer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blood_group_enum_1 = require("../../../common/enums/blood-group.enum");
let InventoryTransfer = class InventoryTransfer {
};
exports.InventoryTransfer = InventoryTransfer;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], InventoryTransfer.prototype, "fromFacility", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], InventoryTransfer.prototype, "toFacility", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: blood_group_enum_1.BloodGroup, required: true }),
    __metadata("design:type", String)
], InventoryTransfer.prototype, "bloodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], InventoryTransfer.prototype, "units", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "PENDING" }),
    __metadata("design:type", String)
], InventoryTransfer.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventoryTransfer.prototype, "requestedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InventoryTransfer.prototype, "fulfilledBy", void 0);
exports.InventoryTransfer = InventoryTransfer = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InventoryTransfer);
exports.InventoryTransferSchema = mongoose_1.SchemaFactory.createForClass(InventoryTransfer);
//# sourceMappingURL=inventory-transfer.schema.js.map