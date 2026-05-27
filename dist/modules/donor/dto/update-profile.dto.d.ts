import { BloodGroup } from "../../../common/enums/blood-group.enum";
export declare class UpdateProfileInput {
    fullName?: string;
    phoneNumber?: string;
    bloodGroup?: BloodGroup;
    genotype?: string;
    gender?: string;
    latitude?: number;
    longitude?: number;
    location?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    lastDonationDate?: string;
    isAvailable?: boolean;
    emergencyContact?: string;
    emergencyContactPhone?: string;
}
