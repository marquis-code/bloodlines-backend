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
exports.DonationFeedback = exports.FeedbackRatingEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
var FeedbackRatingEnum;
(function (FeedbackRatingEnum) {
    FeedbackRatingEnum["TERRIBLE"] = "TERRIBLE";
    FeedbackRatingEnum["BAD"] = "BAD";
    FeedbackRatingEnum["OKAY"] = "OKAY";
    FeedbackRatingEnum["GOOD"] = "GOOD";
    FeedbackRatingEnum["AMAZING"] = "AMAZING";
})(FeedbackRatingEnum || (exports.FeedbackRatingEnum = FeedbackRatingEnum = {}));
class DonationFeedback {
}
exports.DonationFeedback = DonationFeedback;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "fb_123" }),
    __metadata("design:type", String)
], DonationFeedback.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "req_123" }),
    __metadata("design:type", String)
], DonationFeedback.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: FeedbackRatingEnum, example: FeedbackRatingEnum.GOOD }),
    __metadata("design:type", String)
], DonationFeedback.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Great donor, very patient." }),
    __metadata("design:type", String)
], DonationFeedback.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-02-21T10:00:00Z" }),
    __metadata("design:type", Date)
], DonationFeedback.prototype, "submittedAt", void 0);
//# sourceMappingURL=feedback.type.js.map