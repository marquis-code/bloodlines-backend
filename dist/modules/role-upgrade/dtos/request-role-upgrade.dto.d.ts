import { UserRole } from "../../../common/enums/role.enum";
export declare class RequestRoleUpgradeDto {
    requestedRole: UserRole;
    facilityName: string;
    facilityAddress: string;
    reason: string;
}
