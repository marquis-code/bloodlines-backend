import { BloodGroup } from "../../../common/enums/blood-group.enum";
import { AdjustmentType } from "../schemas/inventory-adjustment.schema";
export declare class AdjustInventoryDto {
    bloodType: BloodGroup;
    type: AdjustmentType;
    units: number;
    reason?: string;
}
