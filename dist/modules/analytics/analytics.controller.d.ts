import { AnalyticsService } from "./analytics.service";
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    getBridgerAnalytics(user: any): Promise<{
        totalRequests: number;
        fulfilledRequests: number;
        emergencyRequests: number;
        fulfillmentRate: number;
    }>;
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
