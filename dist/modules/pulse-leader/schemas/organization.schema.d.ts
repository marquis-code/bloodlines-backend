import { HydratedDocument, Types } from "mongoose";
export type OrganizationDocument = HydratedDocument<Organization>;
export declare class Organization {
    name: string;
    description?: string;
    headquarters: string;
    leaderId: Types.ObjectId;
    bridgerIds: Types.ObjectId[];
}
export declare const OrganizationSchema: import("mongoose").Schema<Organization, import("mongoose").Model<Organization, any, any, any, import("mongoose").Document<unknown, any, Organization, any, import("mongoose").DefaultSchemaOptions> & Organization & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, Organization>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Organization, import("mongoose").Document<unknown, {}, Organization, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Organization & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Organization, import("mongoose").Document<unknown, {}, Organization, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Organization & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, Organization, import("mongoose").Document<unknown, {}, Organization, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Organization & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    headquarters?: import("mongoose").SchemaDefinitionProperty<string, Organization, import("mongoose").Document<unknown, {}, Organization, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Organization & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    leaderId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Organization, import("mongoose").Document<unknown, {}, Organization, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Organization & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    bridgerIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Organization, import("mongoose").Document<unknown, {}, Organization, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Organization & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Organization>;
