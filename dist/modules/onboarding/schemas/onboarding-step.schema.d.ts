import { HydratedDocument, Types } from "mongoose";
export type OnboardingStepDocument = HydratedDocument<OnboardingStep>;
export declare enum OnboardingStepEnum {
    STEP_1 = "STEP_1",
    STEP_2 = "STEP_2",
    STEP_3 = "STEP_3",
    COMPLETED = "COMPLETED"
}
export declare class OnboardingStep {
    userId: Types.ObjectId;
    currentStep: OnboardingStepEnum;
    isCompleted: boolean;
    completedAt?: Date;
    stepData: {
        step1?: {
            fullName?: string;
            gender?: string;
            phoneNumber?: string;
        };
        step2?: {
            email?: string;
            bloodGroup?: string;
            genotype?: string;
            location?: string;
            lastDonationDate?: Date;
        };
        step3?: {
            password?: string;
            agreedToDonate?: boolean;
        };
    };
}
export declare const OnboardingStepSchema: import("mongoose").Schema<OnboardingStep, import("mongoose").Model<OnboardingStep, any, any, any, import("mongoose").Document<unknown, any, OnboardingStep, any, import("mongoose").DefaultSchemaOptions> & OnboardingStep & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, OnboardingStep>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OnboardingStep, import("mongoose").Document<unknown, {}, OnboardingStep, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OnboardingStep & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, OnboardingStep, import("mongoose").Document<unknown, {}, OnboardingStep, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    currentStep?: import("mongoose").SchemaDefinitionProperty<OnboardingStepEnum, OnboardingStep, import("mongoose").Document<unknown, {}, OnboardingStep, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isCompleted?: import("mongoose").SchemaDefinitionProperty<boolean, OnboardingStep, import("mongoose").Document<unknown, {}, OnboardingStep, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    completedAt?: import("mongoose").SchemaDefinitionProperty<Date, OnboardingStep, import("mongoose").Document<unknown, {}, OnboardingStep, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    stepData?: import("mongoose").SchemaDefinitionProperty<{
        step1?: {
            fullName?: string;
            gender?: string;
            phoneNumber?: string;
        };
        step2?: {
            email?: string;
            bloodGroup?: string;
            genotype?: string;
            location?: string;
            lastDonationDate?: Date;
        };
        step3?: {
            password?: string;
            agreedToDonate?: boolean;
        };
    }, OnboardingStep, import("mongoose").Document<unknown, {}, OnboardingStep, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OnboardingStep & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, OnboardingStep>;
