import { BloodType } from "../../../common/enums/blood-type.enum";
import { PriorityLevel } from "../../../common/enums/priority-level.enum";
export declare class CreateBloodRequestDto {
    bloodType: BloodType;
    priorityLevel: PriorityLevel;
    unitsNeeded: number;
    contactPhone: string;
    additionalNotes?: string;
}
