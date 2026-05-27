import { HydratedDocument, Types } from "mongoose";
import { BloodGroup } from "../../../common/enums/blood-group.enum";
export type InventoryDocument = HydratedDocument<Inventory>;
export declare class Inventory {
    facilityName: string;
    bloodType: BloodGroup;
    units: number;
    lastUpdatedBy?: Types.ObjectId;
}
export declare const InventorySchema: import("mongoose").Schema<Inventory, import("mongoose").Model<Inventory, any, any, any, import("mongoose").Document<unknown, any, Inventory, any, import("mongoose").DefaultSchemaOptions> & Inventory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, Inventory>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Inventory, import("mongoose").Document<unknown, {}, Inventory, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Inventory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    facilityName?: import("mongoose").SchemaDefinitionProperty<string, Inventory, import("mongoose").Document<unknown, {}, Inventory, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Inventory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    bloodType?: import("mongoose").SchemaDefinitionProperty<BloodGroup, Inventory, import("mongoose").Document<unknown, {}, Inventory, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Inventory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    units?: import("mongoose").SchemaDefinitionProperty<number, Inventory, import("mongoose").Document<unknown, {}, Inventory, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Inventory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lastUpdatedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Inventory, import("mongoose").Document<unknown, {}, Inventory, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Inventory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Inventory>;
