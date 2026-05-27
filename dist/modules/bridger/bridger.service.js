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
exports.BridgerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const blood_request_schema_1 = require("../blood-request/schema/blood-request.schema");
const inventory_schema_1 = require("../inventory/schemas/inventory.schema");
const appointment_schema_1 = require("../appointment/schemas/appointment.schema");
const notification_service_1 = require("../notification/notification.service");
let BridgerService = class BridgerService {
    constructor(userModel, bloodRequestModel, inventoryModel, appointmentModel, notificationService) {
        this.userModel = userModel;
        this.bloodRequestModel = bloodRequestModel;
        this.inventoryModel = inventoryModel;
        this.appointmentModel = appointmentModel;
        this.notificationService = notificationService;
    }
    async getFacilityName(userId) {
        const user = await this.userModel.findById(userId);
        if (!user || !user.facilityName) {
            throw new common_1.BadRequestException("User does not have an associated facility");
        }
        return user.facilityName;
    }
    async getDashboardStats(userId) {
        const facilityName = await this.getFacilityName(userId);
        const user = await this.userModel.findById(userId);
        const [activeRequests, inventory, appointments] = await Promise.all([
            this.bloodRequestModel.countDocuments({ createdBy: userId, status: { $in: ["PENDING", "ACCEPTED"] } }),
            this.inventoryModel.find({ facilityName }),
            this.appointmentModel.countDocuments({ facilityName, date: { $gte: new Date() } })
        ]);
        const donorsNearby = await this.userModel.countDocuments({
            role: "DONOR",
            state: user === null || user === void 0 ? void 0 : user.state,
            isAvailable: true
        });
        return {
            activeRequests,
            inventorySummary: inventory.map(inv => ({ bloodType: inv.bloodType, units: inv.units })),
            donorsNearby,
            upcomingAppointments: appointments
        };
    }
    async searchDonors(userId, bloodType, state, page = 1, limit = 10) {
        const query = { role: "DONOR", isAvailable: true };
        if (bloodType)
            query.bloodGroup = bloodType;
        if (state)
            query.state = state;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.userModel.find(query).select("fullName bloodGroup state city anonymous donationCount").skip(skip).limit(limit).lean(),
            this.userModel.countDocuments(query)
        ]);
        const mappedData = data.map(d => ({
            id: d._id,
            name: d.anonymous ? "Anonymous Donor" : d.fullName,
            bloodGroup: d.bloodGroup,
            location: `${d.city}, ${d.state}`,
            donationCount: d.donationCount
        }));
        return {
            data: mappedData,
            page,
            limit,
            total,
            hasMore: total > skip + data.length
        };
    }
    async getAppointments(userId, page = 1, limit = 10) {
        const facilityName = await this.getFacilityName(userId);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.appointmentModel.find({ facilityName }).populate("donorId", "fullName bloodGroup").sort({ date: 1, timeSlot: 1 }).skip(skip).limit(limit).lean(),
            this.appointmentModel.countDocuments({ facilityName })
        ]);
        return {
            data,
            page,
            limit,
            total,
            hasMore: total > skip + data.length
        };
    }
    async sendEmergencyAlert(userId, dto) {
        const facilityName = await this.getFacilityName(userId);
        const user = await this.userModel.findById(userId);
        const donors = await this.userModel.find({
            role: "DONOR",
            isAvailable: true,
            bloodGroup: { $in: dto.targetBloodGroups },
            state: user === null || user === void 0 ? void 0 : user.state
        }).select("_id");
        const donorIds = donors.map(d => d._id.toString());
        await this.notificationService.sendNotificationToMultipleUsers(donorIds, {
            title: `🚨 EMERGENCY BLOOD REQUEST: ${facilityName}`,
            body: dto.message,
            type: "blood_request",
            data: { facilityName, targetBloodGroups: dto.targetBloodGroups }
        });
        return { success: true, notifiedCount: donorIds.length };
    }
};
exports.BridgerService = BridgerService;
exports.BridgerService = BridgerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(blood_request_schema_1.BloodRequest.name)),
    __param(2, (0, mongoose_1.InjectModel)(inventory_schema_1.Inventory.name)),
    __param(3, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], BridgerService);
//# sourceMappingURL=bridger.service.js.map