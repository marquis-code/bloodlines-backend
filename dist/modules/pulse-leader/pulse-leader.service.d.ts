import { Model } from "mongoose";
import { BloodRequest } from "../blood-request/schema/blood-request.schema";
import { User } from "../user/schemas/user.schema";
import { SearchDonorsFilterDto } from "./dto/search-donors.dto";
import { BroadcastMessageDto } from "./dto/broadcast-message.dto";
import { NotificationGateway } from "../notification/notification.gateway";
export declare class PulseLeaderService {
    private bloodRequestModel;
    private userModel;
    private notificationGateway;
    constructor(bloodRequestModel: Model<BloodRequest>, userModel: Model<User>, notificationGateway: NotificationGateway);
    getDashboardStatistics(pulseLeaderId: string): Promise<{
        activeDonors: number;
        avgResponseTime: string;
        escalationFulfillmentRate: number;
        totalRequests: number;
        totalDonations: number;
        newDonorsRecruited: number;
        emergenciesHandled: number;
    }>;
    private calculateAverageResponseTime;
    getMonthlyMetrics(pulseLeaderId: string, month?: Date): Promise<any[]>;
    searchDonors(filters: SearchDonorsFilterDto, pulseLeaderId: string): Promise<{
        id: any;
        name: any;
        bloodType: any;
        genotype: any;
        distanceKm: number;
        lastDonatedDate: string;
        availability: string;
        phone: any;
        email: any;
    }[]>;
    private calculateDistance;
    broadcastMessage(broadcastDto: BroadcastMessageDto, pulseLeaderId: string): Promise<{
        id: string;
        requestId: string;
        pulseLeaderId: string;
        messageContent: string;
        deliveryStatus: string;
        sentAt: string;
        recipientCount: number;
        deliveredCount: number;
        readCount: number;
    }>;
    getEscalationHistory(pulseLeaderId: string, limit?: number): Promise<{
        id: any;
        bloodType: any;
        urgency: any;
        posted: string;
        outcome: string;
        donorsResponded: any;
    }[]>;
    getRecentActivities(pulseLeaderId: string, limit?: number): Promise<{
        id: any;
        activityType: string;
        description: string;
        actor: any;
        timestamp: string;
        bloodType: any;
        units: any;
    }[]>;
    getRequestFulfillmentBreakdown(pulseLeaderId: string, filterBy?: "bloodType" | "urgency"): Promise<{
        label: string;
        value: number;
        status: string;
    }[]>;
    getPulseLeaderDashboard(pulseLeaderId: string): Promise<{
        statistics: {
            activeDonors: number;
            avgResponseTime: string;
            escalationFulfillmentRate: number;
            totalRequests: number;
            totalDonations: number;
            newDonorsRecruited: number;
            emergenciesHandled: number;
        };
        monthlyMetrics: any[];
        recentBloodRequests: (BloodRequest & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        recentActivities: {
            id: any;
            activityType: string;
            description: string;
            actor: any;
            timestamp: string;
            bloodType: any;
            units: any;
        }[];
        requestFulfillmentByBloodType: {
            label: string;
            value: number;
            status: string;
        }[];
        requestFulfillmentByUrgency: {
            label: string;
            value: number;
            status: string;
        }[];
    }>;
}
