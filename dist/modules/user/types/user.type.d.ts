export declare class UserType {
    id: string;
    email: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    bloodGroup: string;
    genotype?: string;
    location?: string;
    lastDonationDate?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    geoLocation?: {
        type: string;
        coordinates: number[];
    };
    isAvailable: boolean;
    emergencyContact?: string;
    emergencyContactPhone?: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    emailVerified: boolean;
    role: string;
    facilityName?: string;
    facilityAddress?: string;
    donationCount: number;
    agreedToDonate: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
