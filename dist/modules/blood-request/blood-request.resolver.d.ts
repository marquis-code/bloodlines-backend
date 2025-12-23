import { BloodRequestService } from "./blood-request.service";
import { CreateBloodRequestDto } from "./dtos/create-blood-request.dto";
import { PriorityLevel } from "../../common/enums/priority-level.enum";
export declare class BloodRequestResolver {
    private bloodRequestService;
    constructor(bloodRequestService: BloodRequestService);
    createBloodRequest(user: any, createDto: CreateBloodRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getActiveRequests(limit: number, skip: number): Promise<(import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getAllRequests(limit: number, skip: number): Promise<(import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getMyRequests(user: any, limit: number, skip: number): Promise<(import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    confirmDonation(user: any, requestId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateBloodRequest(user: any, requestId: string, priorityLevel?: PriorityLevel, unitsNeeded?: number, contactPhone?: string, additionalNotes?: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
