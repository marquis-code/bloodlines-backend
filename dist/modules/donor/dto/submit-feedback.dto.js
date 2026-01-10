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
exports.SubmitFeedbackInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const feedback_type_1 = require("../types/feedback.type");
let SubmitFeedbackInput = class SubmitFeedbackInput {
};
exports.SubmitFeedbackInput = SubmitFeedbackInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SubmitFeedbackInput.prototype, "requestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => feedback_type_1.FeedbackRatingEnum),
    __metadata("design:type", String)
], SubmitFeedbackInput.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SubmitFeedbackInput.prototype, "comments", void 0);
exports.SubmitFeedbackInput = SubmitFeedbackInput = __decorate([
    (0, graphql_1.InputType)()
], SubmitFeedbackInput);
//# sourceMappingURL=submit-feedback.dto.js.map