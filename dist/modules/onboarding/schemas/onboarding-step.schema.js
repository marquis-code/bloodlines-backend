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
exports.OnboardingStepSchema = exports.OnboardingStep = exports.OnboardingStepEnum = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var OnboardingStepEnum;
(function (OnboardingStepEnum) {
    OnboardingStepEnum["STEP_1"] = "STEP_1";
    OnboardingStepEnum["STEP_2"] = "STEP_2";
    OnboardingStepEnum["STEP_3"] = "STEP_3";
    OnboardingStepEnum["COMPLETED"] = "COMPLETED";
})(OnboardingStepEnum || (exports.OnboardingStepEnum = OnboardingStepEnum = {}));
let OnboardingStep = class OnboardingStep {
};
exports.OnboardingStep = OnboardingStep;
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OnboardingStep.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: OnboardingStepEnum, default: OnboardingStepEnum.STEP_1 }),
    __metadata("design:type", String)
], OnboardingStep.prototype, "currentStep", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], OnboardingStep.prototype, "isCompleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], OnboardingStep.prototype, "completedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], OnboardingStep.prototype, "stepData", void 0);
exports.OnboardingStep = OnboardingStep = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], OnboardingStep);
exports.OnboardingStepSchema = mongoose_1.SchemaFactory.createForClass(OnboardingStep);
//# sourceMappingURL=onboarding-step.schema.js.map