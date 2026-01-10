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
exports.MedicalEligibility = exports.NotificationPreference = exports.DonorProfile = exports.CommunityActivity = exports.DonorDashboard = exports.ProfileCompletion = exports.Achievement = exports.DonorImpact = exports.DonorStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const donation_request_type_1 = require("./donation-request.type");
const donation_history_type_1 = require("./donation-history.type");
let DonorStatus = class DonorStatus {
};
exports.DonorStatus = DonorStatus;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorStatus.prototype, "availability", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorStatus.prototype, "bloodType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DonorStatus.prototype, "nextEligibilityDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DonorStatus.prototype, "lastDonationDate", void 0);
exports.DonorStatus = DonorStatus = __decorate([
    (0, graphql_1.ObjectType)()
], DonorStatus);
let DonorImpact = class DonorImpact {
};
exports.DonorImpact = DonorImpact;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DonorImpact.prototype, "totalDonations", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DonorImpact.prototype, "livesImpacted", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DonorImpact.prototype, "emergenciesHandled", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DonorImpact.prototype, "newDonorsRecruited", void 0);
exports.DonorImpact = DonorImpact = __decorate([
    (0, graphql_1.ObjectType)()
], DonorImpact);
let Achievement = class Achievement {
};
exports.Achievement = Achievement;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Achievement.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Achievement.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Achievement.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Achievement.prototype, "badge", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Achievement.prototype, "unlockedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Achievement.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Achievement.prototype, "streakDays", void 0);
exports.Achievement = Achievement = __decorate([
    (0, graphql_1.ObjectType)()
], Achievement);
let ProfileCompletion = class ProfileCompletion {
};
exports.ProfileCompletion = ProfileCompletion;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProfileCompletion.prototype, "percentComplete", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], ProfileCompletion.prototype, "completedFields", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], ProfileCompletion.prototype, "remainingFields", void 0);
exports.ProfileCompletion = ProfileCompletion = __decorate([
    (0, graphql_1.ObjectType)()
], ProfileCompletion);
let DonorDashboard = class DonorDashboard {
};
exports.DonorDashboard = DonorDashboard;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorDashboard.prototype, "welcomeMessage", void 0);
__decorate([
    (0, graphql_1.Field)(() => ProfileCompletion),
    __metadata("design:type", ProfileCompletion)
], DonorDashboard.prototype, "profileCompletion", void 0);
__decorate([
    (0, graphql_1.Field)(() => DonorStatus),
    __metadata("design:type", DonorStatus)
], DonorDashboard.prototype, "donorStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => DonorImpact),
    __metadata("design:type", DonorImpact)
], DonorDashboard.prototype, "impact", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Achievement]),
    __metadata("design:type", Array)
], DonorDashboard.prototype, "achievements", void 0);
__decorate([
    (0, graphql_1.Field)(() => [donation_request_type_1.DonationRequest]),
    __metadata("design:type", Array)
], DonorDashboard.prototype, "nearbyBloodRequests", void 0);
__decorate([
    (0, graphql_1.Field)(() => [donation_history_type_1.DonationHistory]),
    __metadata("design:type", Array)
], DonorDashboard.prototype, "donationHistory", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CommunityActivity]),
    __metadata("design:type", Array)
], DonorDashboard.prototype, "communityActivity", void 0);
exports.DonorDashboard = DonorDashboard = __decorate([
    (0, graphql_1.ObjectType)()
], DonorDashboard);
let CommunityActivity = class CommunityActivity {
};
exports.CommunityActivity = CommunityActivity;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommunityActivity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommunityActivity.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommunityActivity.prototype, "actorName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CommunityActivity.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommunityActivity.prototype, "icon", void 0);
exports.CommunityActivity = CommunityActivity = __decorate([
    (0, graphql_1.ObjectType)()
], CommunityActivity);
let DonorProfile = class DonorProfile {
};
exports.DonorProfile = DonorProfile;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorProfile.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorProfile.prototype, "fullName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorProfile.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorProfile.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorProfile.prototype, "bloodType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DonorProfile.prototype, "genotype", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorProfile.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DonorProfile.prototype, "latitude", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DonorProfile.prototype, "longitude", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DonorProfile.prototype, "availability", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DonorProfile.prototype, "emergencyContact", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DonorProfile.prototype, "emergencyContactPhone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DonorProfile.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DonorProfile.prototype, "updatedAt", void 0);
exports.DonorProfile = DonorProfile = __decorate([
    (0, graphql_1.ObjectType)()
], DonorProfile);
let NotificationPreference = class NotificationPreference {
};
exports.NotificationPreference = NotificationPreference;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "emergencyAlerts", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "donationReminders", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "communityUpdates", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "reminderFrequency", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "updatedAt", void 0);
exports.NotificationPreference = NotificationPreference = __decorate([
    (0, graphql_1.ObjectType)()
], NotificationPreference);
let MedicalEligibility = class MedicalEligibility {
};
exports.MedicalEligibility = MedicalEligibility;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], MedicalEligibility.prototype, "isEligible", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], MedicalEligibility.prototype, "nextEligibleDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MedicalEligibility.prototype, "reason", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], MedicalEligibility.prototype, "daysSinceLastDonation", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], MedicalEligibility.prototype, "daysUntilEligible", void 0);
exports.MedicalEligibility = MedicalEligibility = __decorate([
    (0, graphql_1.ObjectType)()
], MedicalEligibility);
//# sourceMappingURL=donor-profile.type.js.map