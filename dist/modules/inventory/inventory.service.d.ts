import { Model } from "mongoose";
import { Inventory } from "./schemas/inventory.schema";
import { InventoryAdjustment } from "./schemas/inventory-adjustment.schema";
import { InventoryTransfer } from "./schemas/inventory-transfer.schema";
import { AdjustInventoryDto } from "./dtos/adjust-inventory.dto";
import { TransferInventoryDto } from "./dtos/transfer-inventory.dto";
import { User } from "../user/schemas/user.schema";
export declare class InventoryService {
    private inventoryModel;
    private adjustmentModel;
    private transferModel;
    private userModel;
    constructor(inventoryModel: Model<Inventory>, adjustmentModel: Model<InventoryAdjustment>, transferModel: Model<InventoryTransfer>, userModel: Model<User>);
    private getFacilityName;
    getInventory(userId: string): Promise<(import("mongoose").Document<unknown, {}, Inventory, {}, import("mongoose").DefaultSchemaOptions> & Inventory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    adjustInventory(userId: string, dto: AdjustInventoryDto): Promise<import("mongoose").Document<unknown, {}, Inventory, {}, import("mongoose").DefaultSchemaOptions> & Inventory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getInventoryHistory(userId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, InventoryAdjustment, {}, import("mongoose").DefaultSchemaOptions> & InventoryAdjustment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    transferInventory(userId: string, dto: TransferInventoryDto): Promise<import("mongoose").Document<unknown, {}, InventoryTransfer, {}, import("mongoose").DefaultSchemaOptions> & InventoryTransfer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getTransferHistory(userId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, InventoryTransfer, {}, import("mongoose").DefaultSchemaOptions> & InventoryTransfer & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
}
