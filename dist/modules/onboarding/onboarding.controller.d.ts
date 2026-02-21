import { OnboardingService } from "./onboarding.service";
import { OnboardingStep1Dto, OnboardingStep2Dto, CompleteOnboardingDto } from "./dtos/onboarding.dto";
export declare class OnboardingController {
    private onboardingService;
    constructor(onboardingService: OnboardingService);
    initializeOnboarding(user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/onboarding-step.schema").OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/onboarding-step.schema").OnboardingStep & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    submitStep1(user: any, step1Data: OnboardingStep1Dto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/onboarding-step.schema").OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/onboarding-step.schema").OnboardingStep & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    submitStep2(user: any, step2Data: OnboardingStep2Dto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/onboarding-step.schema").OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/onboarding-step.schema").OnboardingStep & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    completeOnboarding(user: any, step3Data: CompleteOnboardingDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/onboarding-step.schema").OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/onboarding-step.schema").OnboardingStep & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getOnboardingStatus(user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/onboarding-step.schema").OnboardingStep, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/onboarding-step.schema").OnboardingStep & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
