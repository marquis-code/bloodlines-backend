import { RoleUpgradeService } from "./role-upgrade.service";
import { UserRole } from "../../common/enums/role.enum";
export declare class RoleUpgradeController {
    private roleUpgradeService;
    constructor(roleUpgradeService: RoleUpgradeService);
    requestRoleUpgrade(body: {
        requestedRole: UserRole;
        facilityName: string;
        facilityAddress: string;
        reason: string;
    }, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/request-role-upgrade.schema").RoleUpgradeRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/request-role-upgrade.schema").RoleUpgradeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPendingUpgradeRequests(limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/request-role-upgrade.schema").RoleUpgradeRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/request-role-upgrade.schema").RoleUpgradeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    approveRoleUpgrade(requestId: string, user: any): Promise<{
        message: string;
    }>;
    rejectRoleUpgrade(requestId: string, rejectionReason: string, user: any): Promise<{
        message: string;
    }>;
    getMyUpgradeHistory(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/request-role-upgrade.schema").RoleUpgradeRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/request-role-upgrade.schema").RoleUpgradeRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
