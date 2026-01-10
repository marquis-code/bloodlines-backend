import { DonationProgressStatusEnum } from "../types/donation-request.type";
export declare class UpdateProgressInput {
    requestId: string;
    status: DonationProgressStatusEnum;
    location?: string;
    estimatedArrivalTime?: string;
}
