import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";
import { UserRole } from "../../../common/enums/role.enum";
export type RoleUpgradeRequestDocument = HydratedDocument<RoleUpgradeRequest>;
export declare class RoleUpgradeRequest {
    userId: Types.ObjectId;
    requestedRole: UserRole;
    facilityName: string;
    facilityAddress: string;
    reason: string;
    status: string;
    reviewedBy?: Types.ObjectId;
    reviewDate?: Date;
    rejectionReason?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const RoleUpgradeRequestSchema: import("mongoose").Schema<RoleUpgradeRequest, import("mongoose").Model<RoleUpgradeRequest, any, any, any, import("mongoose").Document<unknown, any, RoleUpgradeRequest, any, import("mongoose").DefaultSchemaOptions> & RoleUpgradeRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, RoleUpgradeRequest>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    requestedRole?: import("mongoose").SchemaDefinitionProperty<UserRole, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    facilityName?: import("mongoose").SchemaDefinitionProperty<string, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    facilityAddress?: import("mongoose").SchemaDefinitionProperty<string, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    reason?: import("mongoose").SchemaDefinitionProperty<string, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    reviewedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    reviewDate?: import("mongoose").SchemaDefinitionProperty<Date, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    rejectionReason?: import("mongoose").SchemaDefinitionProperty<string, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, RoleUpgradeRequest, import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<RoleUpgradeRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, RoleUpgradeRequest>;
