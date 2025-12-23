import { PriorityLevel } from "../../../common/enums/priority-level.enum";
import { RequestStatus } from "../../../common/enums/request-status.enum";
export declare class UpdateBloodRequestDto {
    priorityLevel?: PriorityLevel;
    unitsNeeded?: number;
    contactPhone?: string;
    additionalNotes?: string;
    status?: RequestStatus;
}
