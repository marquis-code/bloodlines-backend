import { DonorService } from "./donor.service";
import { AcceptRequestInput } from "./dto/accept-request.dto";
import { RejectRequestInput } from "./dto/reject-request.dto";
import { SubmitFeedbackInput } from "./dto/submit-feedback.dto";
import { UpdateProgressInput } from "./dto/update-progress.dto";
import { UpdateProfileInput } from "./dto/update-profile.dto";
import { UpdateAvailabilityInput } from "./dto/update-availability.dto";
import { UpdateNotificationPreferencesInput } from "./dto/update-notification-preferences.dto";
import { SetGoalDto } from "./dto/set-goal.dto";
import { SubmitHealthScreeningDto } from "./dto/submit-health-screening.dto";
import { ResourceCategoryEnum } from "./types/resource.type";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { NotificationGateway } from "../notification/notification.gateway";
export declare class DonorController {
    private readonly donorService;
    private readonly notificationGateway;
    constructor(donorService: DonorService, notificationGateway: NotificationGateway);
    getDonorDashboard(user: any): Promise<import("./types/donor-profile.type").DonorDashboard>;
    getDonorDashboardSummary(user: any): Promise<{
        name: string;
        nearbyRequestsCount: number;
        profileCompletion: any;
    }>;
    getDonorStats(user: any): Promise<{
        totalDonations: any;
        livesSaved: any;
        currentBadge: any;
        nextMilestone: string;
    }>;
    getDonorProfileCompletion(user: any): Promise<any>;
    getDonorProfile(user: any): Promise<import("./types/donor-profile.type").DonorProfile>;
    getNearbyBloodRequests(user: any, radiusKm?: string, paginationDto?: PaginationDto): Promise<{
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
            status: import("./types/donation-request.type").DonationProgressStatusEnum;
            distance: number;
        }[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    getBloodRequestDetails(requestId: string): Promise<import("./types/donation-request.type").DonationRequest>;
    getResources(category?: ResourceCategoryEnum, searchQuery?: string): Promise<import("./types/resource.type").ResourcesPage>;
    getDonationHistory(user: any, paginationDto: PaginationDto, status?: string): Promise<{
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
    getDonationRecord(user: any, donationId: string): Promise<import("mongoose").Document<unknown, {}, import("../blood-request/schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("../blood-request/schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getDonationCertificate(user: any, donationId: string): Promise<{
        certificateUrl: string;
        issuedAt: Date;
    }>;
    getNotificationPreferences(user: any): Promise<import("./types/donor-profile.type").NotificationPreference>;
    getMedicalEligibility(user: any): Promise<import("./types/donor-profile.type").MedicalEligibility>;
    updateProfile(user: any, input: UpdateProfileInput): Promise<import("./types/donor-profile.type").DonorProfile>;
    updateAvailability(user: any, input: UpdateAvailabilityInput): Promise<import("./types/donor-profile.type").DonorProfile>;
    updateNotificationPreferences(user: any, input: UpdateNotificationPreferencesInput): Promise<import("./types/donor-profile.type").NotificationPreference>;
    acceptBloodRequest(user: any, input: AcceptRequestInput): Promise<import("./types/donation-request.type").DonationProgressUpdate>;
    rejectBloodRequest(user: any, input: RejectRequestInput): Promise<boolean>;
    updateDonationProgress(user: any, input: UpdateProgressInput): Promise<import("./types/donation-request.type").DonationProgressUpdate>;
    getRequestProgress(user: any, requestId: string): Promise<import("mongoose").Document<unknown, {}, import("../blood-request/schema/blood-request.schema").BloodRequest, {}, import("mongoose").DefaultSchemaOptions> & import("../blood-request/schema/blood-request.schema").BloodRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getBadges(user: any): Promise<{
        earned: any[];
        next: {
            id: string;
            name: string;
            description: string;
            badge: string;
            progress: number;
        };
    }>;
    getLeaderboard(limit?: string, region?: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        donations: number;
        location: string;
    }[]>;
    toggleAnonymity(user: any, anonymous: boolean): Promise<{
        message: string;
    }>;
    getHealthScreeningQuestions(): Promise<{
        id: string;
        question: string;
        expected: boolean;
    }[]>;
    submitHealthScreening(user: any, dto: SubmitHealthScreeningDto): Promise<{
        cleared: boolean;
        deferredReason: string;
        eligibleDate: Date;
    }>;
    getGoal(user: any, year?: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/donor-goal.schema").DonorGoal, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/donor-goal.schema").DonorGoal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    setGoal(user: any, dto: SetGoalDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/donor-goal.schema").DonorGoal, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/donor-goal.schema").DonorGoal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getShareableImpact(user: any): Promise<{
        text: string;
        url: string;
        stats: any;
    }>;
    getActivityFeed(paginationDto: PaginationDto): Promise<{
        data: any[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    submitDonationFeedback(user: any, input: SubmitFeedbackInput): Promise<import("./types/feedback.type").DonationFeedback>;
}
