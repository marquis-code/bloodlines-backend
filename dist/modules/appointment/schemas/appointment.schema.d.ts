import { HydratedDocument, Types } from "mongoose";
export type AppointmentDocument = HydratedDocument<Appointment>;
export declare enum AppointmentStatus {
    SCHEDULED = "SCHEDULED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    NO_SHOW = "NO_SHOW"
}
export declare class Appointment {
    donorId: Types.ObjectId;
    facilityName: string;
    date: Date;
    timeSlot: string;
    status: AppointmentStatus;
}
export declare const AppointmentSchema: import("mongoose").Schema<Appointment, import("mongoose").Model<Appointment, any, any, any, import("mongoose").Document<unknown, any, Appointment, any, import("mongoose").DefaultSchemaOptions> & Appointment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, Appointment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Appointment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    donorId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    facilityName?: import("mongoose").SchemaDefinitionProperty<string, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    date?: import("mongoose").SchemaDefinitionProperty<Date, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    timeSlot?: import("mongoose").SchemaDefinitionProperty<string, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<AppointmentStatus, Appointment, import("mongoose").Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Appointment>;
