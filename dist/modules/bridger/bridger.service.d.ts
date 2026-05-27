import { Model } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { BloodRequest } from "../blood-request/schema/blood-request.schema";
import { Inventory } from "../inventory/schemas/inventory.schema";
import { Appointment } from "../appointment/schemas/appointment.schema";
import { NotificationService } from "../notification/notification.service";
import { EmergencyAlertDto } from "./dtos/emergency-alert.dto";
export declare class BridgerService {
    private userModel;
    private bloodRequestModel;
    private inventoryModel;
    private appointmentModel;
    private notificationService;
    constructor(userModel: Model<User>, bloodRequestModel: Model<BloodRequest>, inventoryModel: Model<Inventory>, appointmentModel: Model<Appointment>, notificationService: NotificationService);
    private getFacilityName;
    getDashboardStats(userId: string): Promise<{
        activeRequests: number;
        inventorySummary: {
            bloodType: import("../../common/enums/blood-group.enum").BloodGroup;
            units: number;
        }[];
        donorsNearby: number;
        upcomingAppointments: number;
    }>;
    searchDonors(userId: string, bloodType?: string, state?: string, page?: number, limit?: number): Promise<{
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
    getAppointments(userId: string, page?: number, limit?: number): Promise<{
        data: (Appointment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    sendEmergencyAlert(userId: string, dto: EmergencyAlertDto): Promise<{
        success: boolean;
        notifiedCount: number;
    }>;
}
