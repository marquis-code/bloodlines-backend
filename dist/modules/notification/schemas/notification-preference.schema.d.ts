import { HydratedDocument, Types } from "mongoose";
export type NotificationPreferenceDocument = HydratedDocument<NotificationPreference>;
export declare class NotificationPreference {
    userId: Types.ObjectId;
    emergencyAlerts: boolean;
    donationReminders: boolean;
    communityUpdates: boolean;
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
}
export declare const NotificationPreferenceSchema: import("mongoose").Schema<NotificationPreference, import("mongoose").Model<NotificationPreference, any, any, any, import("mongoose").Document<unknown, any, NotificationPreference, any, import("mongoose").DefaultSchemaOptions> & NotificationPreference & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, NotificationPreference>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NotificationPreference, import("mongoose").Document<unknown, {}, NotificationPreference, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<NotificationPreference & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, NotificationPreference, import("mongoose").Document<unknown, {}, NotificationPreference, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emergencyAlerts?: import("mongoose").SchemaDefinitionProperty<boolean, NotificationPreference, import("mongoose").Document<unknown, {}, NotificationPreference, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    donationReminders?: import("mongoose").SchemaDefinitionProperty<boolean, NotificationPreference, import("mongoose").Document<unknown, {}, NotificationPreference, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    communityUpdates?: import("mongoose").SchemaDefinitionProperty<boolean, NotificationPreference, import("mongoose").Document<unknown, {}, NotificationPreference, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    emailEnabled?: import("mongoose").SchemaDefinitionProperty<boolean, NotificationPreference, import("mongoose").Document<unknown, {}, NotificationPreference, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    smsEnabled?: import("mongoose").SchemaDefinitionProperty<boolean, NotificationPreference, import("mongoose").Document<unknown, {}, NotificationPreference, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    pushEnabled?: import("mongoose").SchemaDefinitionProperty<boolean, NotificationPreference, import("mongoose").Document<unknown, {}, NotificationPreference, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<NotificationPreference & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, NotificationPreference>;
