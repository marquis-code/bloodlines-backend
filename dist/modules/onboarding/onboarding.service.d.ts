import { Model, Types } from "mongoose";
import { OnboardingStep } from "./schemas/onboarding-step.schema";
import { User } from "../user/schemas/user.schema";
import { OnboardingStep1Dto } from "./dtos/onboarding.dto";
import { OnboardingStep2Dto } from "./dtos/onboarding.dto";
import { CompleteOnboardingDto } from "./dtos/onboarding.dto";
export declare class OnboardingService {
    private onboardingModel;
    private userModel;
    constructor(onboardingModel: Model<OnboardingStep>, userModel: Model<User>);
    initializeOnboarding(userId: Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    submitStep1(userId: Types.ObjectId, step1Data: OnboardingStep1Dto): Promise<import("mongoose").Document<unknown, {}, OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    submitStep2(userId: Types.ObjectId, step2Data: OnboardingStep2Dto): Promise<import("mongoose").Document<unknown, {}, OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    completeOnboarding(userId: Types.ObjectId, step3Data: CompleteOnboardingDto): Promise<import("mongoose").Document<unknown, {}, OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getOnboardingStatus(userId: Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
}
