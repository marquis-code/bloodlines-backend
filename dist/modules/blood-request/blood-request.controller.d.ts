import { BloodRequestService } from "./blood-request.service";
import { CreateBloodRequestDto } from "./dtos/create-blood-request.dto";
import { UpdateBloodRequestDto } from "./dtos/update-blood-request.dto";
export declare class BloodRequestController {
    private bloodRequestService;
    constructor(bloodRequestService: BloodRequestService);
    createBloodRequest(user: any, createDto: CreateBloodRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getActiveRequests(limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getAllRequests(limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getMyRequests(user: any, limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getRequestsForDonor(user: any, limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getRequestById(requestId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    acceptBloodRequest(user: any, requestId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    confirmDonation(user: any, requestId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    notifyDonorArrival(user: any, requestId: string): Promise<{
        message: string;
    }>;
    escalateRequest(user: any, requestId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateBloodRequest(user: any, requestId: string, updateDto: UpdateBloodRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    cancelBloodRequest(user: any, requestId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
