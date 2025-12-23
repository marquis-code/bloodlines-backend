import { Model } from "mongoose";
import { RoleUpgradeRequest } from "./schemas/request-role-upgrade.schema";
import { User } from "../user/schemas/user.schema";
import { RequestRoleUpgradeDto } from "./dtos/request-role-upgrade.dto";
export declare class RoleUpgradeService {
    private roleUpgradeModel;
    private userModel;
    constructor(roleUpgradeModel: Model<RoleUpgradeRequest>, userModel: Model<User>);
    requestRoleUpgrade(userId: string, requestDto: RequestRoleUpgradeDto): Promise<import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {}, import("mongoose").DefaultSchemaOptions> & RoleUpgradeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPendingRequests(limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {}, import("mongoose").DefaultSchemaOptions> & RoleUpgradeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    approveUpgrade(requestId: string, adminId: string): Promise<{
        message: string;
    }>;
    rejectUpgrade(requestId: string, adminId: string, rejectionReason: string): Promise<{
        message: string;
    }>;
    getUserUpgradeHistory(userId: string): Promise<(import("mongoose").Document<unknown, {}, RoleUpgradeRequest, {}, import("mongoose").DefaultSchemaOptions> & RoleUpgradeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
