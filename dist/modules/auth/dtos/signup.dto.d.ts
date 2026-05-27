import { Gender } from "../../../common/enums/gender.enum";
import { BloodGroup } from "../../../common/enums/blood-group.enum";
import { Genotype } from "../../../common/enums/genotype.enum";
export declare class SignupDto {
    fullName: string;
    gender: Gender;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    bloodGroup?: BloodGroup;
    genotype?: Genotype;
    location?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    lastDonationDate?: string;
}
