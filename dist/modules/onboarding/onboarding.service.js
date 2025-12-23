"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const onboarding_step_schema_1 = require("./schemas/onboarding-step.schema");
const user_schema_1 = require("../user/schemas/user.schema");
let OnboardingService = class OnboardingService {
    constructor(onboardingModel, userModel) {
        this.onboardingModel = onboardingModel;
        this.userModel = userModel;
    }
    async initializeOnboarding(userId) {
        const existingOnboarding = await this.onboardingModel.findOne({ userId });
        if (existingOnboarding) {
            return existingOnboarding;
        }
        const onboarding = new this.onboardingModel({
            userId,
            currentStep: onboarding_step_schema_1.OnboardingStepEnum.STEP_1,
            stepData: {
                step1: {},
                step2: {},
                step3: {},
            },
        });
        return onboarding.save();
    }
    async submitStep1(userId, step1Data) {
        const onboarding = await this.onboardingModel.findOne({ userId });
        if (!onboarding) {
            throw new common_1.NotFoundException("Onboarding not found");
        }
        onboarding.stepData.step1 = step1Data;
        onboarding.currentStep = onboarding_step_schema_1.OnboardingStepEnum.STEP_2;
        await this.userModel.findByIdAndUpdate(userId, {
            fullName: step1Data.fullName,
            gender: step1Data.gender,
            phoneNumber: step1Data.phoneNumber,
        });
        return onboarding.save();
    }
    async submitStep2(userId, step2Data) {
        const onboarding = await this.onboardingModel.findOne({ userId });
        if (!onboarding) {
            throw new common_1.NotFoundException("Onboarding not found");
        }
        onboarding.stepData.step2 = {
            email: step2Data.email,
            bloodGroup: step2Data.bloodGroup,
            genotype: step2Data.genotype,
            location: step2Data.location,
            lastDonationDate: step2Data.lastDonationDate ? new Date(step2Data.lastDonationDate) : undefined,
        };
        onboarding.currentStep = onboarding_step_schema_1.OnboardingStepEnum.STEP_3;
        await this.userModel.findByIdAndUpdate(userId, {
            email: step2Data.email,
            bloodGroup: step2Data.bloodGroup,
            genotype: step2Data.genotype,
            location: step2Data.location,
            lastDonationDate: step2Data.lastDonationDate ? new Date(step2Data.lastDonationDate) : undefined,
        });
        return onboarding.save();
    }
    async completeOnboarding(userId, step3Data) {
        const onboarding = await this.onboardingModel.findOne({ userId });
        if (!onboarding) {
            throw new common_1.NotFoundException("Onboarding not found");
        }
        if (step3Data.password !== step3Data.confirmPassword) {
            throw new common_1.BadRequestException("Passwords do not match");
        }
        const hashedPassword = await bcrypt.hash(step3Data.password, 10);
        onboarding.stepData.step3 = {
            password: "***",
            agreedToDonate: true,
        };
        onboarding.currentStep = onboarding_step_schema_1.OnboardingStepEnum.COMPLETED;
        onboarding.isCompleted = true;
        onboarding.completedAt = new Date();
        await this.userModel.findByIdAndUpdate(userId, {
            password: hashedPassword,
            agreedToDonate: true,
            isActive: true,
        });
        return onboarding.save();
    }
    async getOnboardingStatus(userId) {
        const onboarding = await this.onboardingModel.findOne({ userId });
        if (!onboarding) {
            throw new common_1.NotFoundException("Onboarding not found");
        }
        return onboarding;
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(onboarding_step_schema_1.OnboardingStep.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map