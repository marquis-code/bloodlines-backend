import { BridgerService } from "./bridger.service";
import { EmergencyAlertDto } from "./dtos/emergency-alert.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
export declare class BridgerController {
    private bridgerService;
    constructor(bridgerService: BridgerService);
    getDashboardStats(user: any): Promise<{
        activeRequests: number;
        inventorySummary: {
            bloodType: import("../../common/enums/blood-group.enum").BloodGroup;
            units: number;
        }[];
        donorsNearby: number;
        upcomingAppointments: number;
    }>;
    searchDonors(user: any, bloodType?: string, state?: string, paginationDto?: PaginationDto): Promise<{
        data: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            bloodGroup: import("../../common/enums/blood-group.enum").BloodGroup;
            location: string;
            donationCount: number;
        }[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    getAppointments(user: any, paginationDto: PaginationDto): Promise<{
        data: (import("../appointment/schemas/appointment.schema").Appointment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    sendEmergencyAlert(user: any, dto: EmergencyAlertDto): Promise<{
        success: boolean;
        notifiedCount: number;
    }>;
}
