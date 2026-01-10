import { BloodGroup } from "../../../common/enums/blood-group.enum";
import { PriorityLevel } from "../../../common/enums/priority-level.enum";
export declare class CreateBloodRequestDto {
    bloodType: BloodGroup;
    priorityLevel: PriorityLevel;
    unitsNeeded: number;
    contactPhone: string;
    additionalNotes?: string;
}
