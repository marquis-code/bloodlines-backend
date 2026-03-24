import { Model } from "mongoose";
import { BloodRequest } from "./schema/blood-request.schema";
import { User } from "../user/schemas/user.schema";
import { CreateBloodRequestDto } from "./dtos/create-blood-request.dto";
import { UpdateBloodRequestDto } from "./dtos/update-blood-request.dto";
import { BloodRequestGateway } from "./blood-request.gateway";
import { NotificationService } from "../notification/notification.service";
export declare class BloodRequestService {
    private bloodRequestModel;
    private userModel;
    private bloodRequestGateway;
    private notificationService;
    constructor(bloodRequestModel: Model<BloodRequest>, userModel: Model<User>, bloodRequestGateway: BloodRequestGateway, notificationService: NotificationService);
    createBloodRequest(userId: string, createDto: CreateBloodRequestDto): Promise<import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getActiveRequests(limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getRequestsByUser(userId: string, limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getRequestsForDonor(donorId: string, limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    acceptBloodRequest(requestId: string, donorId: string): Promise<import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    confirmDonation(requestId: string, donorId: string): Promise<import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    notifyDonorArrival(requestId: string, donorId: string): Promise<{
        message: string;
    }>;
    escalateRequest(requestId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateRequest(requestId: string, userId: string, updateDto: UpdateBloodRequestDto): Promise<import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    cancelRequest(requestId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllRequests(limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getRequestById(requestId: string): Promise<import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
