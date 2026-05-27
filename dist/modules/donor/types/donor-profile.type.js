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
exports.MedicalEligibility = exports.NotificationPreference = exports.DonorProfile = exports.DonorDashboard = exports.CommunityActivity = exports.ProfileCompletion = exports.Achievement = exports.DonorImpact = exports.DonorStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const donation_request_type_1 = require("./donation-request.type");
const donation_history_type_1 = require("./donation-history.type");
class DonorStatus {
}
exports.DonorStatus = DonorStatus;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], DonorStatus.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], DonorStatus.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-04-01" }),
    __metadata("design:type", Date)
], DonorStatus.prototype, "nextEligibilityDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-01-01" }),
    __metadata("design:type", Date)
], DonorStatus.prototype, "lastDonationDate", void 0);
class DonorImpact {
}
exports.DonorImpact = DonorImpact;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], DonorImpact.prototype, "totalDonations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], DonorImpact.prototype, "livesImpacted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], DonorImpact.prototype, "emergenciesHandled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], DonorImpact.prototype, "newDonorsRecruited", void 0);
class Achievement {
}
exports.Achievement = Achievement;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "ach_1" }),
    __metadata("design:type", String)
], Achievement.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "First Donation" }),
    __metadata("design:type", String)
], Achievement.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "You donated for the first time!" }),
    __metadata("design:type", String)
], Achievement.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "badge_icon_url" }),
    __metadata("design:type", String)
], Achievement.prototype, "badge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", Date)
], Achievement.prototype, "unlockedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], Achievement.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], Achievement.prototype, "streakDays", void 0);
class ProfileCompletion {
}
exports.ProfileCompletion = ProfileCompletion;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80 }),
    __metadata("design:type", Number)
], ProfileCompletion.prototype, "percentComplete", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ["fullName", "email"] }),
    __metadata("design:type", Array)
], ProfileCompletion.prototype, "completedFields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ["genotype"] }),
    __metadata("design:type", Array)
], ProfileCompletion.prototype, "remainingFields", void 0);
class CommunityActivity {
}
exports.CommunityActivity = CommunityActivity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "act_1" }),
    __metadata("design:type", String)
], CommunityActivity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John donated A+ blood" }),
    __metadata("design:type", String)
], CommunityActivity.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John Doe" }),
    __metadata("design:type", String)
], CommunityActivity.prototype, "actorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T10:00:00Z" }),
    __metadata("design:type", Date)
], CommunityActivity.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "blood_drop" }),
    __metadata("design:type", String)
], CommunityActivity.prototype, "icon", void 0);
class DonorDashboard {
}
exports.DonorDashboard = DonorDashboard;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Welcome back, John!" }),
    __metadata("design:type", String)
], DonorDashboard.prototype, "welcomeMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProfileCompletion }),
    __metadata("design:type", ProfileCompletion)
], DonorDashboard.prototype, "profileCompletion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DonorStatus }),
    __metadata("design:type", DonorStatus)
], DonorDashboard.prototype, "donorStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DonorImpact }),
    __metadata("design:type", DonorImpact)
], DonorDashboard.prototype, "impact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Achievement] }),
    __metadata("design:type", Array)
], DonorDashboard.prototype, "achievements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [donation_request_type_1.DonationRequest] }),
    __metadata("design:type", Array)
], DonorDashboard.prototype, "nearbyBloodRequests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [donation_history_type_1.DonationHistory] }),
    __metadata("design:type", Array)
], DonorDashboard.prototype, "donationHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CommunityActivity] }),
    __metadata("design:type", Array)
], DonorDashboard.prototype, "communityActivity", void 0);
class DonorProfile {
}
exports.DonorProfile = DonorProfile;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "donor_123" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "John Doe" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "john@example.com" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+2348012345678" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A+" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "AA" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "genotype", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Male" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6.5244 }),
    __metadata("design:type", Number)
], DonorProfile.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3.3792 }),
    __metadata("design:type", Number)
], DonorProfile.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos, Nigeria" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "123 Street Name" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Lagos State" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Nigeria" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2023-10-01" }),
    __metadata("design:type", Date)
], DonorProfile.prototype, "lastDonationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], DonorProfile.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Jane Doe" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+2348098765432" }),
    __metadata("design:type", String)
], DonorProfile.prototype, "emergencyContactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", Date)
], DonorProfile.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", Date)
], DonorProfile.prototype, "updatedAt", void 0);
class NotificationPreference {
}
exports.NotificationPreference = NotificationPreference;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "pref_123" }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user_123" }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "emergencyAlerts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "donationReminders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "communityUpdates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "daily" }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "reminderFrequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "updatedAt", void 0);
class MedicalEligibility {
}
exports.MedicalEligibility = MedicalEligibility;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], MedicalEligibility.prototype, "isEligible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-04-01" }),
    __metadata("design:type", Date)
], MedicalEligibility.prototype, "nextEligibleDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Too soon after last donation" }),
    __metadata("design:type", String)
], MedicalEligibility.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], MedicalEligibility.prototype, "daysSinceLastDonation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    __metadata("design:type", Number)
], MedicalEligibility.prototype, "daysUntilEligible", void 0);
//# sourceMappingURL=donor-profile.type.js.map