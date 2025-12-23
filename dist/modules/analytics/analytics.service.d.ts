import { Model } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { BloodRequest } from "../blood-request/schema/blood-request.schema";
export declare class AnalyticsService {
    private bloodRequestModel;
    private userModel;
    constructor(bloodRequestModel: Model<BloodRequest>, userModel: Model<User>);
    getTotalRequests(): Promise<number>;
    getBloodInventory(): Promise<{}>;
    getRequestsFulfillmentByBloodType(): Promise<any[]>;
    getRequestsFulfillmentByUrgency(): Promise<any[]>;
    getAverageResponseTime(): Promise<string>;
    getDonorResponseStats(): Promise<{
        total: number;
        accepted: {
            count: number;
            percentage: number;
        };
        escalated: {
            count: number;
            percentage: number;
        };
        noResponse: {
            count: number;
            percentage: number;
        };
    }>;
    getTopBridgers(limit?: number): Promise<any[]>;
    getRequestFulfillmentTimeSeries(months?: number): Promise<{
        month: string;
        count: any;
    }[]>;
}
