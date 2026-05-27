import { PulseLeaderService } from "./pulse-leader.service";
import { SearchDonorsFilterDto } from "./dto/search-donors.dto";
import { BroadcastMessageDto } from "./dto/broadcast-message.dto";
import { CreateCampaignDto } from "./dtos/create-campaign.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
export declare class PulseLeaderController {
    private pulseLeaderService;
    constructor(pulseLeaderService: PulseLeaderService);
    getPulseLeaderDashboard(user: any): Promise<{
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
        recentBloodRequests: (import("../blood-request/schema/blood-request.schema").BloodRequest & {
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
    searchDonors(filters: SearchDonorsFilterDto, user: any): Promise<{
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
    getEscalationHistory(limit: number, user: any): Promise<{
        id: any;
        bloodType: any;
        urgency: any;
        posted: string;
        outcome: string;
        donorsResponded: any;
    }[]>;
    broadcastMessage(broadcastDto: BroadcastMessageDto, user: any): Promise<{
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
    getRecentActivities(limit: number, user: any): Promise<{
        id: any;
        activityType: string;
        description: string;
        actor: any;
        timestamp: string;
        bloodType: any;
        units: any;
    }[]>;
    getNetworkPerformance(user: any): Promise<{
        facilityName: string;
        totalFulfilled: number;
        activeRequests: number;
    }[]>;
    getCampaigns(user: any, paginationDto: PaginationDto): Promise<{
        data: (import("./schemas/campaign.schema").Campaign & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    createCampaign(user: any, dto: CreateCampaignDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/campaign.schema").Campaign, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/campaign.schema").Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getBridgers(user: any, paginationDto: PaginationDto): Promise<{
        data: (import("../user/schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    addBridgerToOrg(user: any, bridgerId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/organization.schema").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
