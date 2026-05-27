import { HydratedDocument, Types } from "mongoose";
import { BloodGroup } from "../../../common/enums/blood-group.enum";
export type InventoryAdjustmentDocument = HydratedDocument<InventoryAdjustment>;
export declare enum AdjustmentType {
    RECEIVED = "RECEIVED",
    USED = "USED",
    WASTED = "WASTED",
    MANUAL_ADJUSTMENT = "MANUAL_ADJUSTMENT"
}
export declare class InventoryAdjustment {
    facilityName: string;
    bloodType: BloodGroup;
    type: AdjustmentType;
    units: number;
    reason?: string;
    adjustedBy: Types.ObjectId;
}
export declare const InventoryAdjustmentSchema: import("mongoose").Schema<InventoryAdjustment, import("mongoose").Model<InventoryAdjustment, any, any, any, import("mongoose").Document<unknown, any, InventoryAdjustment, any, import("mongoose").DefaultSchemaOptions> & InventoryAdjustment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, InventoryAdjustment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InventoryAdjustment, import("mongoose").Document<unknown, {}, InventoryAdjustment, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryAdjustment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    facilityName?: import("mongoose").SchemaDefinitionProperty<string, InventoryAdjustment, import("mongoose").Document<unknown, {}, InventoryAdjustment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryAdjustment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    bloodType?: import("mongoose").SchemaDefinitionProperty<BloodGroup, InventoryAdjustment, import("mongoose").Document<unknown, {}, InventoryAdjustment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryAdjustment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    type?: import("mongoose").SchemaDefinitionProperty<AdjustmentType, InventoryAdjustment, import("mongoose").Document<unknown, {}, InventoryAdjustment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryAdjustment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    units?: import("mongoose").SchemaDefinitionProperty<number, InventoryAdjustment, import("mongoose").Document<unknown, {}, InventoryAdjustment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryAdjustment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    reason?: import("mongoose").SchemaDefinitionProperty<string, InventoryAdjustment, import("mongoose").Document<unknown, {}, InventoryAdjustment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryAdjustment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    adjustedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, InventoryAdjustment, import("mongoose").Document<unknown, {}, InventoryAdjustment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryAdjustment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, InventoryAdjustment>;
