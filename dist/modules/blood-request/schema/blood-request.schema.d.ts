import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";
import { BloodType } from "../../../common/enums/blood-type.enum";
import { PriorityLevel } from "../../../common/enums/priority-level.enum";
import { RequestStatus } from "../../../common/enums/request-status.enum";
import { DonorResponse } from "../../../common/enums/donor-response.enum";
export type BloodRequestDocument = HydratedDocument<BloodRequest>;
export declare class BloodRequest {
    bloodType: BloodType;
    priorityLevel: PriorityLevel;
    unitsNeeded: number;
    contactPhone: string;
    additionalNotes?: string;
    status: RequestStatus;
    createdBy: Types.ObjectId;
    assignedDonors?: Types.ObjectId[];
    donorResponseStatus: DonorResponse;
    fulfillmentDate?: Date;
    unitsConfirmed: number;
    unitsEscalated: number;
    unitsNoResponse: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const BloodRequestSchema: import("mongoose").Schema<BloodRequest, import("mongoose").Model<BloodRequest, any, any, any, import("mongoose").Document<unknown, any, BloodRequest, any, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, BloodRequest>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    bloodType?: import("mongoose").SchemaDefinitionProperty<BloodType, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    priorityLevel?: import("mongoose").SchemaDefinitionProperty<PriorityLevel, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    unitsNeeded?: import("mongoose").SchemaDefinitionProperty<number, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    contactPhone?: import("mongoose").SchemaDefinitionProperty<string, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    additionalNotes?: import("mongoose").SchemaDefinitionProperty<string, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<RequestStatus, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    assignedDonors?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    donorResponseStatus?: import("mongoose").SchemaDefinitionProperty<DonorResponse, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fulfillmentDate?: import("mongoose").SchemaDefinitionProperty<Date, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    unitsConfirmed?: import("mongoose").SchemaDefinitionProperty<number, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    unitsEscalated?: import("mongoose").SchemaDefinitionProperty<number, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    unitsNoResponse?: import("mongoose").SchemaDefinitionProperty<number, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, BloodRequest, import("mongoose").Document<unknown, {}, BloodRequest, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BloodRequest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, BloodRequest>;
