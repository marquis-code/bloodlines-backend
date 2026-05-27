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
exports.NotificationPreferenceSchema = exports.NotificationPreference = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let NotificationPreference = class NotificationPreference {
};
exports.NotificationPreference = NotificationPreference;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true, unique: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], NotificationPreference.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "emergencyAlerts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "donationReminders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "communityUpdates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "emailEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "smsEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "pushEnabled", void 0);
exports.NotificationPreference = NotificationPreference = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NotificationPreference);
exports.NotificationPreferenceSchema = mongoose_1.SchemaFactory.createForClass(NotificationPreference);
//# sourceMappingURL=notification-preference.schema.js.map