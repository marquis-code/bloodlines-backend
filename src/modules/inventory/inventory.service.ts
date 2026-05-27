import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Inventory } from "./schemas/inventory.schema";
import { InventoryAdjustment, AdjustmentType } from "./schemas/inventory-adjustment.schema";
import { InventoryTransfer } from "./schemas/inventory-transfer.schema";
import { AdjustInventoryDto } from "./dtos/adjust-inventory.dto";
import { TransferInventoryDto } from "./dtos/transfer-inventory.dto";
import { User } from "../user/schemas/user.schema";

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    @InjectModel(InventoryAdjustment.name) private adjustmentModel: Model<InventoryAdjustment>,
    @InjectModel(InventoryTransfer.name) private transferModel: Model<InventoryTransfer>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  private async getFacilityName(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.facilityName) {
      throw new BadRequestException("User does not have an associated facility");
    }
    return user.facilityName;
  }

  async getInventory(userId: string) {
    const facilityName = await this.getFacilityName(userId);
    return this.inventoryModel.find({ facilityName });
  }

  async adjustInventory(userId: string, dto: AdjustInventoryDto) {
    const facilityName = await this.getFacilityName(userId);
    
    let inventory = await this.inventoryModel.findOne({ facilityName, bloodType: dto.bloodType });
    
    if (!inventory) {
      if (dto.type === AdjustmentType.USED || dto.type === AdjustmentType.WASTED) {
         throw new BadRequestException("Not enough inventory to deduct");
      }
      inventory = new this.inventoryModel({ facilityName, bloodType: dto.bloodType, units: 0 });
    }

    if (dto.type === AdjustmentType.RECEIVED) {
      inventory.units += dto.units;
    } else if (dto.type === AdjustmentType.USED || dto.type === AdjustmentType.WASTED) {
      if (inventory.units < dto.units) {
        throw new BadRequestException("Not enough inventory to deduct");
      }
      inventory.units -= dto.units;
    } else if (dto.type === AdjustmentType.MANUAL_ADJUSTMENT) {
      // For manual adjustment, units can be negative to deduct, or positive to add
      if (inventory.units + dto.units < 0) {
         throw new BadRequestException("Adjustment would result in negative inventory");
      }
      inventory.units += dto.units;
    }

    inventory.lastUpdatedBy = userId as any;
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

  async getInventoryHistory(userId: string, page = 1, limit = 10) {
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
    }
  }

  async transferInventory(userId: string, dto: TransferInventoryDto) {
    const facilityName = await this.getFacilityName(userId);

    // Deduct from current facility
    await this.adjustInventory(userId, {
      bloodType: dto.bloodType,
      type: AdjustmentType.MANUAL_ADJUSTMENT,
      units: -dto.units,
      reason: `Transfer to ${dto.toFacility}`
    });

    const transfer = new this.transferModel({
      fromFacility: facilityName,
      toFacility: dto.toFacility,
      bloodType: dto.bloodType,
      units: dto.units,
      requestedBy: userId,
      status: "COMPLETED" // Auto complete for simplicity, could be PENDING
    });

    await transfer.save();

    // Add to destination facility
    let destInventory = await this.inventoryModel.findOne({ facilityName: dto.toFacility, bloodType: dto.bloodType });
    if (!destInventory) {
      destInventory = new this.inventoryModel({ facilityName: dto.toFacility, bloodType: dto.bloodType, units: 0 });
    }
    destInventory.units += dto.units;
    destInventory.lastUpdatedBy = userId as any;
    await destInventory.save();

    return transfer;
  }

  async getTransferHistory(userId: string, page = 1, limit = 10) {
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
    }
  }
}
