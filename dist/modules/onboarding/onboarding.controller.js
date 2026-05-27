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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const onboarding_service_1 = require("./onboarding.service");
const onboarding_dto_1 = require("./dtos/onboarding.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let OnboardingController = class OnboardingController {
    constructor(onboardingService) {
        this.onboardingService = onboardingService;
    }
    async initializeOnboarding(user) {
        return this.onboardingService.initializeOnboarding(user.userId);
    }
    async submitStep1(user, step1Data) {
        return this.onboardingService.submitStep1(user.userId, step1Data);
    }
    async submitStep2(user, step2Data) {
        return this.onboardingService.submitStep2(user.userId, step2Data);
    }
    async completeOnboarding(user, step3Data) {
        return this.onboardingService.completeOnboarding(user.userId, step3Data);
    }
    async getOnboardingStatus(user) {
        return this.onboardingService.getOnboardingStatus(user.userId);
    }
};
exports.OnboardingController = OnboardingController;
__decorate([
    (0, common_1.Post)("initialize"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "initializeOnboarding", null);
__decorate([
    (0, common_1.Post)("step1"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboarding_dto_1.OnboardingStep1Dto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "submitStep1", null);
__decorate([
    (0, common_1.Post)("step2"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboarding_dto_1.OnboardingStep2Dto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "submitStep2", null);
__decorate([
    (0, common_1.Post)("complete"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onboarding_dto_1.CompleteOnboardingDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "completeOnboarding", null);
__decorate([
    (0, common_1.Get)("status"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getOnboardingStatus", null);
exports.OnboardingController = OnboardingController = __decorate([
    (0, swagger_1.ApiTags)("Onboarding"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("onboarding"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [onboarding_service_1.OnboardingService])
], OnboardingController);
//# sourceMappingURL=onboarding.controller.js.map