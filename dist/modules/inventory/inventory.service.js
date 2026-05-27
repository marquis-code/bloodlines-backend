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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const inventory_schema_1 = require("./schemas/inventory.schema");
const inventory_adjustment_schema_1 = require("./schemas/inventory-adjustment.schema");
const inventory_transfer_schema_1 = require("./schemas/inventory-transfer.schema");
const user_schema_1 = require("../user/schemas/user.schema");
let InventoryService = class InventoryService {
    constructor(inventoryModel, adjustmentModel, transferModel, userModel) {
        this.inventoryModel = inventoryModel;
        this.adjustmentModel = adjustmentModel;
        this.transferModel = transferModel;
        this.userModel = userModel;
    }
    async getFacilityName(userId) {
        const user = await this.userModel.findById(userId);
        if (!user || !user.facilityName) {
            throw new common_1.BadRequestException("User does not have an associated facility");
        }
        return user.facilityName;
    }
    async getInventory(userId) {
        const facilityName = await this.getFacilityName(userId);
        return this.inventoryModel.find({ facilityName });
    }
    async adjustInventory(userId, dto) {
        const facilityName = await this.getFacilityName(userId);
        let inventory = await this.inventoryModel.findOne({ facilityName, bloodType: dto.bloodType });
        if (!inventory) {
            if (dto.type === inventory_adjustment_schema_1.AdjustmentType.USED || dto.type === inventory_adjustment_schema_1.AdjustmentType.WASTED) {
                throw new common_1.BadRequestException("Not enough inventory to deduct");
            }
            inventory = new this.inventoryModel({ facilityName, bloodType: dto.bloodType, units: 0 });
        }
        if (dto.type === inventory_adjustment_schema_1.AdjustmentType.RECEIVED) {
            inventory.units += dto.units;
        }
        else if (dto.type === inventory_adjustment_schema_1.AdjustmentType.USED || dto.type === inventory_adjustment_schema_1.AdjustmentType.WASTED) {
            if (inventory.units < dto.units) {
                throw new common_1.BadRequestException("Not enough inventory to deduct");
            }
            inventory.units -= dto.units;
        }
        else if (dto.type === inventory_adjustment_schema_1.AdjustmentType.MANUAL_ADJUSTMENT) {
            if (inventory.units + dto.units < 0) {
                throw new common_1.BadRequestException("Adjustment would result in negative inventory");
            }
            inventory.units += dto.units;
        }
        inventory.lastUpdatedBy = userId;
        await inventory.save();
        const adjustment = new this.adjustmentModel({
            facilityName,
            bloodType: dto.bloodType,
            type: dto.type,
            units: dto.units,
            reason: dto.reason,
            adjustedBy: userId
        });
        await adjustment.save();
        return inventory;
    }
    async getInventoryHistory(userId, page = 1, limit = 10) {
        const facilityName = await this.getFacilityName(userId);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.adjustmentModel.find({ facilityName }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("adjustedBy", "fullName"),
            this.adjustmentModel.countDocuments({ facilityName })
        ]);
        return {
            data,
            page,
            limit,
            total,
            hasMore: total > skip + data.length
        };
    }
    async transferInventory(userId, dto) {
        const facilityName = await this.getFacilityName(userId);
        await this.adjustInventory(userId, {
            bloodType: dto.bloodType,
            type: inventory_adjustment_schema_1.AdjustmentType.MANUAL_ADJUSTMENT,
            units: -dto.units,
            reason: `Transfer to ${dto.toFacility}`
        });
        const transfer = new this.transferModel({
            fromFacility: facilityName,
            toFacility: dto.toFacility,
            bloodType: dto.bloodType,
            units: dto.units,
            requestedBy: userId,
            status: "COMPLETED"
        });
        await transfer.save();
        let destInventory = await this.inventoryModel.findOne({ facilityName: dto.toFacility, bloodType: dto.bloodType });
        if (!destInventory) {
            destInventory = new this.inventoryModel({ facilityName: dto.toFacility, bloodType: dto.bloodType, units: 0 });
        }
        destInventory.units += dto.units;
        destInventory.lastUpdatedBy = userId;
        await destInventory.save();
        return transfer;
    }
    async getTransferHistory(userId, page = 1, limit = 10) {
        const facilityName = await this.getFacilityName(userId);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.transferModel.find({ $or: [{ fromFacility: facilityName }, { toFacility: facilityName }] })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("requestedBy", "fullName"),
            this.transferModel.countDocuments({ $or: [{ fromFacility: facilityName }, { toFacility: facilityName }] })
        ]);
        return {
            data,
            page,
            limit,
            total,
            hasMore: total > skip + data.length
        };
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(inventory_schema_1.Inventory.name)),
    __param(1, (0, mongoose_1.InjectModel)(inventory_adjustment_schema_1.InventoryAdjustment.name)),
    __param(2, (0, mongoose_1.InjectModel)(inventory_transfer_schema_1.InventoryTransfer.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map