import { HydratedDocument, Types } from "mongoose";
export type HealthScreeningDocument = HydratedDocument<HealthScreening>;
export declare class HealthScreening {
    userId: Types.ObjectId;
    answers: Record<string, boolean>;
    cleared: boolean;
    deferredReason?: string;
    eligibleDate?: Date;
    submittedAt: Date;
}
export declare const HealthScreeningSchema: import("mongoose").Schema<HealthScreening, import("mongoose").Model<HealthScreening, any, any, any, import("mongoose").Document<unknown, any, HealthScreening, any, import("mongoose").DefaultSchemaOptions> & HealthScreening & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, HealthScreening>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HealthScreening, import("mongoose").Document<unknown, {}, HealthScreening, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<HealthScreening & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, HealthScreening, import("mongoose").Document<unknown, {}, HealthScreening, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<HealthScreening & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    answers?: import("mongoose").SchemaDefinitionProperty<Record<string, boolean>, HealthScreening, import("mongoose").Document<unknown, {}, HealthScreening, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<HealthScreening & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    cleared?: import("mongoose").SchemaDefinitionProperty<boolean, HealthScreening, import("mongoose").Document<unknown, {}, HealthScreening, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<HealthScreening & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deferredReason?: import("mongoose").SchemaDefinitionProperty<string, HealthScreening, import("mongoose").Document<unknown, {}, HealthScreening, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<HealthScreening & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    eligibleDate?: import("mongoose").SchemaDefinitionProperty<Date, HealthScreening, import("mongoose").Document<unknown, {}, HealthScreening, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<HealthScreening & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    submittedAt?: import("mongoose").SchemaDefinitionProperty<Date, HealthScreening, import("mongoose").Document<unknown, {}, HealthScreening, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<HealthScreening & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, HealthScreening>;
