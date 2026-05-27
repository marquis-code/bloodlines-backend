import { InventoryService } from "./inventory.service";
import { AdjustInventoryDto } from "./dtos/adjust-inventory.dto";
import { TransferInventoryDto } from "./dtos/transfer-inventory.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
export declare class InventoryController {
    private inventoryService;
    constructor(inventoryService: InventoryService);
    getInventory(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/inventory.schema").Inventory, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/inventory.schema").Inventory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    adjustInventory(user: any, dto: AdjustInventoryDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/inventory.schema").Inventory, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/inventory.schema").Inventory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getInventoryHistory(user: any, paginationDto: PaginationDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/inventory-adjustment.schema").InventoryAdjustment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/inventory-adjustment.schema").InventoryAdjustment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    getInventoryAudit(user: any, paginationDto: PaginationDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/inventory-adjustment.schema").InventoryAdjustment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/inventory-adjustment.schema").InventoryAdjustment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    transferInventory(user: any, dto: TransferInventoryDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/inventory-transfer.schema").InventoryTransfer, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/inventory-transfer.schema").InventoryTransfer & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getTransferHistory(user: any, paginationDto: PaginationDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/inventory-transfer.schema").InventoryTransfer, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/inventory-transfer.schema").InventoryTransfer & {
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
