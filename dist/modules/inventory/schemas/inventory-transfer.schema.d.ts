import { HydratedDocument, Types } from "mongoose";
import { BloodGroup } from "../../../common/enums/blood-group.enum";
export type InventoryTransferDocument = HydratedDocument<InventoryTransfer>;
export declare class InventoryTransfer {
    fromFacility: string;
    toFacility: string;
    bloodType: BloodGroup;
    units: number;
    status: string;
    requestedBy: Types.ObjectId;
    fulfilledBy?: Types.ObjectId;
}
export declare const InventoryTransferSchema: import("mongoose").Schema<InventoryTransfer, import("mongoose").Model<InventoryTransfer, any, any, any, import("mongoose").Document<unknown, any, InventoryTransfer, any, import("mongoose").DefaultSchemaOptions> & InventoryTransfer & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, InventoryTransfer>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InventoryTransfer, import("mongoose").Document<unknown, {}, InventoryTransfer, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryTransfer & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    fromFacility?: import("mongoose").SchemaDefinitionProperty<string, InventoryTransfer, import("mongoose").Document<unknown, {}, InventoryTransfer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryTransfer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    toFacility?: import("mongoose").SchemaDefinitionProperty<string, InventoryTransfer, import("mongoose").Document<unknown, {}, InventoryTransfer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryTransfer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    bloodType?: import("mongoose").SchemaDefinitionProperty<BloodGroup, InventoryTransfer, import("mongoose").Document<unknown, {}, InventoryTransfer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryTransfer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    units?: import("mongoose").SchemaDefinitionProperty<number, InventoryTransfer, import("mongoose").Document<unknown, {}, InventoryTransfer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryTransfer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, InventoryTransfer, import("mongoose").Document<unknown, {}, InventoryTransfer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryTransfer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    requestedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, InventoryTransfer, import("mongoose").Document<unknown, {}, InventoryTransfer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryTransfer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fulfilledBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, InventoryTransfer, import("mongoose").Document<unknown, {}, InventoryTransfer, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventoryTransfer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, InventoryTransfer>;
