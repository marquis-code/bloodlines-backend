import { HydratedDocument, Types } from "mongoose";
export type CampaignDocument = HydratedDocument<Campaign>;
export declare class Campaign {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    targetDonations: number;
    currentDonations: number;
    organizationId: Types.ObjectId;
    createdBy: Types.ObjectId;
    status: string;
}
export declare const CampaignSchema: import("mongoose").Schema<Campaign, import("mongoose").Model<Campaign, any, any, any, import("mongoose").Document<unknown, any, Campaign, any, import("mongoose").DefaultSchemaOptions> & Campaign & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, Campaign>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    targetDonations?: import("mongoose").SchemaDefinitionProperty<number, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    currentDonations?: import("mongoose").SchemaDefinitionProperty<number, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    organizationId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Campaign & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Campaign>;
