import { HydratedDocument, Types } from "mongoose";
export type OrganizationAnalyticsDocument = HydratedDocument<OrganizationAnalytics>;
export declare class OrganizationAnalytics {
    organizationId: Types.ObjectId;
    date: Date;
    totalDonors: number;
    activeDonors: number;
    totalBloodRequests: number;
    fulfilledBloodRequests: number;
    escalatedRequests: number;
    emergenciesHandled: number;
}
export declare const OrganizationAnalyticsSchema: import("mongoose").Schema<OrganizationAnalytics, import("mongoose").Model<OrganizationAnalytics, any, any, any, import("mongoose").Document<unknown, any, OrganizationAnalytics, any, import("mongoose").DefaultSchemaOptions> & OrganizationAnalytics & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, OrganizationAnalytics>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    organizationId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    date?: import("mongoose").SchemaDefinitionProperty<Date, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    totalDonors?: import("mongoose").SchemaDefinitionProperty<number, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    activeDonors?: import("mongoose").SchemaDefinitionProperty<number, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    totalBloodRequests?: import("mongoose").SchemaDefinitionProperty<number, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fulfilledBloodRequests?: import("mongoose").SchemaDefinitionProperty<number, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    escalatedRequests?: import("mongoose").SchemaDefinitionProperty<number, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergenciesHandled?: import("mongoose").SchemaDefinitionProperty<number, OrganizationAnalytics, import("mongoose").Document<unknown, {}, OrganizationAnalytics, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrganizationAnalytics & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, OrganizationAnalytics>;
