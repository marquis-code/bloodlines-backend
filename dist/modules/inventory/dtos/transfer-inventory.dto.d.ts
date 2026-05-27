import { BloodGroup } from "../../../common/enums/blood-group.enum";
export declare class TransferInventoryDto {
    toFacility: string;
    bloodType: BloodGroup;
    units: number;
}
