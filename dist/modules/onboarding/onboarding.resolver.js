"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const onboarding_service_1 = require("./onboarding.service");
const onboarding_dto_1 = require("./dtos/onboarding.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let OnboardingResolver = class OnboardingResolver {
    constructor(onboardingService) {
        this.onboardingService = onboardingService;
    }
    async initializeOnboarding(user) {
        const result = await this.onboardingService.initializeOnboarding(user.userId);
        return JSON.stringify(result);
    }
    async submitStep1(user, step1Data) {
        const result = await this.onboardingService.submitStep1(user.userId, step1Data);
        return JSON.stringify(result);
    }
    async submitStep2(user, step2Data) {
        const result = await this.onboardingService.submitStep2(user.userId, step2Data);
        return JSON.stringify(result);
    }
    async completeOnboarding(user, step3Data) {
        const result = await this.onboardingService.completeOnboarding(user.userId, step3Data);
        return JSON.stringify(result);
    }
    async getOnboardingStatus(user) {
        const result = await this.onboardingService.getOnboardingStatus(user.userId);
        return JSON.stringify(result);
    }
};
exports.OnboardingResolver = OnboardingResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingResolver.prototype, "initializeOnboarding", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboarding_dto_1.OnboardingStep1Dto]),
    __metadata("design:returntype", Promise)
], OnboardingResolver.prototype, "submitStep1", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboarding_dto_1.OnboardingStep2Dto]),
    __metadata("design:returntype", Promise)
], OnboardingResolver.prototype, "submitStep2", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboarding_dto_1.CompleteOnboardingDto]),
    __metadata("design:returntype", Promise)
], OnboardingResolver.prototype, "completeOnboarding", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingResolver.prototype, "getOnboardingStatus", null);
exports.OnboardingResolver = OnboardingResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [onboarding_service_1.OnboardingService])
], OnboardingResolver);
//# sourceMappingURL=onboarding.resolver.js.map