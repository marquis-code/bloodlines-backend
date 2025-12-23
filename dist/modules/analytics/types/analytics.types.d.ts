export declare class BloodInventoryType {
    bloodType: string;
    count: number;
}
export declare class FulfillmentStatsType {
    bloodType: string;
    percentage: number;
    total: number;
    fulfilled: number;
}
export declare class UrgencyStatsType {
    urgency: string;
    percentage: number;
    total: number;
    fulfilled: number;
}
export declare class ResponseCountType {
    count: number;
    percentage: number;
}
export declare class DonorResponseStatsType {
    total: number;
    accepted: ResponseCountType;
    escalated: ResponseCountType;
    noResponse: ResponseCountType;
}
export declare class TopBridgerType {
    id: string;
    name: string;
    facilityName?: string;
    requestCount: number;
    totalUnitsConfirmed: number;
}
export declare class TimeSeriesDataType {
    month: string;
    count: number;
}
export declare class AnalyticsType {
    totalRequests: number;
    bloodInventory: BloodInventoryType[];
    fulfillmentByBloodType: FulfillmentStatsType[];
    fulfillmentByUrgency: UrgencyStatsType[];
    averageResponseTime: string;
    donorResponse: DonorResponseStatsType;
    topBridgers: TopBridgerType[];
    fulfillmentTimeSeries: TimeSeriesDataType[];
}
