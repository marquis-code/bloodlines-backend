import { BloodGroup } from "../../../common/enums/blood-group.enum";
import { Genotype } from "../../../common/enums/genotype.enum";
export declare class OnboardingStep1Dto {
    fullName: string;
    gender: string;
    phoneNumber: string;
}
export declare class OnboardingStep2Dto {
    email: string;
    bloodGroup: BloodGroup;
    genotype?: Genotype;
    location: string;
    lastDonationDate?: string;
}
export declare class CompleteOnboardingDto {
    password: string;
    confirmPassword: string;
}
