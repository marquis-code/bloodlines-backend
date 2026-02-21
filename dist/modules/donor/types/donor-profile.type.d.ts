import { DonationRequest } from "./donation-request.type";
import { DonationHistory } from "./donation-history.type";
export declare class DonorStatus {
    availability: string;
    bloodType: string;
    nextEligibilityDate: Date;
    lastDonationDate?: Date;
}
export declare class DonorImpact {
    totalDonations: number;
    livesImpacted: number;
    emergenciesHandled: number;
    newDonorsRecruited: number;
}
export declare class Achievement {
    id: string;
    name: string;
    description: string;
    badge: string;
    unlockedAt: Date;
    level: number;
    streakDays: number;
}
export declare class ProfileCompletion {
    percentComplete: number;
    completedFields: string[];
    remainingFields: string[];
}
export declare class CommunityActivity {
    id: string;
    message: string;
    actorName: string;
    timestamp: Date;
    icon: string;
}
export declare class DonorDashboard {
    welcomeMessage: string;
    profileCompletion: ProfileCompletion;
    donorStatus: DonorStatus;
    impact: DonorImpact;
    achievements: Achievement[];
    nearbyBloodRequests: DonationRequest[];
    donationHistory: DonationHistory[];
    communityActivity: CommunityActivity[];
}
export declare class DonorProfile {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    bloodType: string;
    genotype?: string;
    gender: string;
    latitude: number;
    longitude: number;
    availability: string;
    emergencyContact?: string;
    emergencyContactPhone?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class NotificationPreference {
    id: string;
    userId: string;
    emergencyAlerts: boolean;
    donationReminders: boolean;
    communityUpdates: boolean;
    reminderFrequency: string;
    updatedAt: Date;
}
export declare class MedicalEligibility {
    isEligible: boolean;
    nextEligibleDate: Date;
    reason?: string;
    daysSinceLastDonation: number;
    daysUntilEligible: number;
}
