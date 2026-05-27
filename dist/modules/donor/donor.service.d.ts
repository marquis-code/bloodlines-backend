import { Model } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { BloodRequest } from "../blood-request/schema/blood-request.schema";
import { DonorGoal } from "./schemas/donor-goal.schema";
import { HealthScreening } from "./schemas/health-screening.schema";
import { DonationProgressStatusEnum, DonationProgressUpdate, DonationRequest } from "./types/donation-request.type";
import { DonorDashboard, DonorProfile, NotificationPreference, MedicalEligibility } from "./types/donor-profile.type";
import { ResourcesPage, ResourceCategoryEnum } from "./types/resource.type";
import { DonationFeedback } from "./types/feedback.type";
import { AcceptRequestInput } from "./dto/accept-request.dto";
import { RejectRequestInput } from "./dto/reject-request.dto";
import { SubmitFeedbackInput } from "./dto/submit-feedback.dto";
import { UpdateProgressInput } from "./dto/update-progress.dto";
import { UpdateProfileInput } from "./dto/update-profile.dto";
import { UpdateAvailabilityInput } from "./dto/update-availability.dto";
import { UpdateNotificationPreferencesInput } from "./dto/update-notification-preferences.dto";
import { DonationHistory } from "./types/donation-history.type";
import { NotificationService } from "../notification/notification.service";
export declare class DonorService {
    private userModel;
    private bloodRequestModel;
    private donorGoalModel;
    private healthScreeningModel;
    private notificationService;
    constructor(userModel: Model<User>, bloodRequestModel: Model<BloodRequest>, donorGoalModel: Model<DonorGoal>, healthScreeningModel: Model<HealthScreening>, notificationService: NotificationService);
    getDonorDashboard(userId: string): Promise<DonorDashboard>;
    getDonorDashboardSummary(userId: string): Promise<{
        name: string;
        nearbyRequestsCount: number;
        profileCompletion: any;
    }>;
    getDonorStats(userId: string): Promise<{
        totalDonations: any;
        livesSaved: any;
        currentBadge: any;
        nextMilestone: string;
    }>;
    getDonorProfileCompletion(userId: string): Promise<any>;
    getDonorProfile(userId: string): Promise<DonorProfile>;
    updateProfile(userId: string, input: UpdateProfileInput): Promise<DonorProfile>;
    updateAvailability(userId: string, input: UpdateAvailabilityInput): Promise<DonorProfile>;
    getNotificationPreferences(userId: string): Promise<NotificationPreference>;
    updateNotificationPreferences(userId: string, input: UpdateNotificationPreferencesInput): Promise<NotificationPreference>;
    getNearbyBloodRequests(userId: string, radiusKm: number, page?: number, limit?: number): Promise<{
        data: {
            id: any;
            bloodType: any;
            priority: any;
            unitsNeeded: any;
            hospitalName: any;
            address: any;
            contactPhone: any;
            instructions: any;
            createdAt: any;
            status: DonationProgressStatusEnum;
            distance: number;
        }[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    getBloodRequestDetails(requestId: string): Promise<DonationRequest>;
    acceptBloodRequest(userId: string, input: AcceptRequestInput): Promise<DonationProgressUpdate>;
    rejectBloodRequest(userId: string, input: RejectRequestInput): Promise<void>;
    updateDonationProgress(userId: string, input: UpdateProgressInput): Promise<DonationProgressUpdate>;
    getDonationHistoryPaginated(userId: string, page: number, limit: number, status?: string): Promise<{
        data: {
            id: any;
            hospitalName: any;
            bloodType: any;
            unitsGiven: number;
            donatedAt: any;
            status: any;
            facilityName: any;
            facilityAddress: any;
            facilityPhone: any;
        }[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    getDonationRecord(userId: string, donationId: string): Promise<import("mongoose").Document<unknown, {}, BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getDonationCertificate(userId: string, donationId: string): Promise<{
        certificateUrl: string;
        issuedAt: Date;
    }>;
    getDonationHistory(userId: string, limit: number): Promise<DonationHistory[]>;
    getResources(category: ResourceCategoryEnum, searchQuery?: string): Promise<ResourcesPage>;
    getBadges(userId: string): Promise<{
        earned: any[];
        next: {
            id: string;
            name: string;
            description: string;
            badge: string;
            progress: number;
        };
    }>;
    getLeaderboard(limit?: number, region?: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        donations: number;
        location: string;
    }[]>;
    toggleAnonymity(userId: string, isAnonymous: boolean): Promise<{
        message: string;
    }>;
    getHealthScreeningQuestions(): Promise<{
        id: string;
        question: string;
        expected: boolean;
    }[]>;
    submitHealthScreening(userId: string, answers: Record<string, boolean>): Promise<{
        cleared: boolean;
        deferredReason: string;
        eligibleDate: Date;
    }>;
    getGoal(userId: string, year: number): Promise<import("mongoose").Document<unknown, {}, DonorGoal, {}, import("mongoose").DefaultSchemaOptions> & DonorGoal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    setGoal(userId: string, target: number, year: number): Promise<import("mongoose").Document<unknown, {}, DonorGoal, {}, import("mongoose").DefaultSchemaOptions> & DonorGoal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getShareableImpact(userId: string): Promise<{
        text: string;
        url: string;
        stats: any;
    }>;
    getCommunityActivityFeed(page?: number, limit?: number): Promise<{
        data: any[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    submitFeedback(userId: string, input: SubmitFeedbackInput): Promise<DonationFeedback>;
    private calculateProfileCompletion;
    private getDonorStatus;
    private calculateNextEligibilityDate;
    getMedicalEligibility(userId: string): Promise<MedicalEligibility>;
    private calculateDonorImpact;
    private getUserAchievements;
    private getCommunityActivity;
    private calculateDistance;
}
