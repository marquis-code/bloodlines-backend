import { OnboardingService } from "./onboarding.service";
import { OnboardingStep1Dto, OnboardingStep2Dto, CompleteOnboardingDto } from "./dtos/onboarding.dto";
export declare class OnboardingResolver {
    private onboardingService;
    constructor(onboardingService: OnboardingService);
    initializeOnboarding(user: any): Promise<string>;
    submitStep1(user: any, step1Data: OnboardingStep1Dto): Promise<string>;
    submitStep2(user: any, step2Data: OnboardingStep2Dto): Promise<string>;
    completeOnboarding(user: any, step3Data: CompleteOnboardingDto): Promise<string>;
    getOnboardingStatus(user: any): Promise<string>;
}
