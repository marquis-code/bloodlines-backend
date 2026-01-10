import { BloodGroup } from "../../../common/enums/blood-group.enum";
import { PriorityLevel } from "../../../common/enums/priority-level.enum";
export declare enum DonationProgressStatusEnum {
    ACCEPTED = "ACCEPTED",
    ON_YOUR_WAY = "ON_YOUR_WAY",
    ARRIVED_AT_HOSPITAL = "ARRIVED_AT_HOSPITAL",
    DONATION_COMPLETE = "DONATION_COMPLETE",
    CANCELLED = "CANCELLED"
}
export declare class DonationProgressUpdate {
    requestId: string;
    status: DonationProgressStatusEnum;
    timestamp: Date;
    location?: string;
    estimatedArrivalTime?: string;
}
export declare class DonationRequest {
    id: string;
    bloodType: BloodGroup;
    priority: PriorityLevel;
    unitsNeeded: number;
    hospitalName: string;
    address: string;
    contactPhone: string;
    instructions: string;
    createdAt: Date;
    acceptedAt?: Date;
    rejectedAt?: Date;
    status: DonationProgressStatusEnum;
    distance: number;
}
export declare class DonationHistory {
    id: string;
    hospitalName: string;
    donatedAt: Date;
    bloodType: BloodGroup;
    unitsGiven: number;
    status: string;
}
