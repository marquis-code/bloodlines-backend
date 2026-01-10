import { BloodRequestType } from "../../blood-request/types/blood-request.type";
export declare class DashboardStatisticsType {
    activeDonors: number;
    avgResponseTime: string;
    escalationFulfillmentRate: number;
    totalRequests: number;
    totalDonations: number;
    newDonorsRecruited: number;
    emergenciesHandled: number;
}
export declare class MonthlyCoordinationMetricsType {
    month: string;
    donations: number;
    requests: number;
}
export declare class EscalationHistoryType {
    id: string;
    bloodType: string;
    urgency: string;
    posted: string;
    outcome: string;
    donorsResponded: number;
}
export declare class DonorSearchResultType {
    id: string;
    name: string;
    bloodType: string;
    genotype: string;
    distanceKm: number;
    lastDonatedDate: string;
    availability: string;
    phone: string;
    email: string;
}
export declare class BroadcastMessageType {
    id: string;
    requestId: string;
    pulseLeaderId: string;
    messageContent: string;
    deliveryStatus: string;
    sentAt: string;
    recipientCount: number;
    deliveredCount: number;
    readCount: number;
}
export declare class RecentActivityType {
    id: string;
    activityType: string;
    description: string;
    actor: string;
    timestamp: string;
    bloodType: string;
    units: number;
}
export declare class AnalyticsBreakdownType {
    label: string;
    value: number;
    status: string;
}
export declare class PulseLeaderDashboardType {
    statistics: DashboardStatisticsType;
    monthlyMetrics: MonthlyCoordinationMetricsType[];
    recentBloodRequests: BloodRequestType[];
    recentActivities: RecentActivityType[];
    requestFulfillmentByBloodType: AnalyticsBreakdownType[];
    requestFulfillmentByUrgency: AnalyticsBreakdownType[];
}
