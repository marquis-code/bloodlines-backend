import { AnalyticsService } from "./analytics.service";
export declare class AnalyticsResolver {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    getAnalytics(): Promise<{
        totalRequests: number;
        bloodInventory: {
            bloodType: string;
            count: unknown;
        }[];
        fulfillmentByBloodType: any[];
        fulfillmentByUrgency: any[];
        averageResponseTime: string;
        donorResponse: {
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
        };
        topBridgers: any[];
        fulfillmentTimeSeries: {
            month: string;
            count: any;
        }[];
    }>;
}
