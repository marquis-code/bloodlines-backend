import { Gender } from "../../../common/enums/gender.enum";
export declare class SignupDto {
    fullName: string;
    gender: Gender;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}
