import { HydratedDocument, Types } from "mongoose";
export type DonorGoalDocument = HydratedDocument<DonorGoal>;
export declare class DonorGoal {
    userId: Types.ObjectId;
    target: number;
    current: number;
    year: number;
}
export declare const DonorGoalSchema: import("mongoose").Schema<DonorGoal, import("mongoose").Model<DonorGoal, any, any, any, import("mongoose").Document<unknown, any, DonorGoal, any, import("mongoose").DefaultSchemaOptions> & DonorGoal & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, DonorGoal>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DonorGoal, import("mongoose").Document<unknown, {}, DonorGoal, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DonorGoal & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DonorGoal, import("mongoose").Document<unknown, {}, DonorGoal, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DonorGoal & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    target?: import("mongoose").SchemaDefinitionProperty<number, DonorGoal, import("mongoose").Document<unknown, {}, DonorGoal, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DonorGoal & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    current?: import("mongoose").SchemaDefinitionProperty<number, DonorGoal, import("mongoose").Document<unknown, {}, DonorGoal, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DonorGoal & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    year?: import("mongoose").SchemaDefinitionProperty<number, DonorGoal, import("mongoose").Document<unknown, {}, DonorGoal, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DonorGoal & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, DonorGoal>;
