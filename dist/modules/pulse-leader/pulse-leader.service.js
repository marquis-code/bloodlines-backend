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
exports.PulseLeaderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blood_request_schema_1 = require("../blood-request/schema/blood-request.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const notification_gateway_1 = require("../notification/notification.gateway");
const notification_service_1 = require("../notification/notification.service");
let PulseLeaderService = class PulseLeaderService {
    constructor(bloodRequestModel, userModel, notificationGateway, notificationService) {
        this.bloodRequestModel = bloodRequestModel;
        this.userModel = userModel;
        this.notificationGateway = notificationGateway;
        this.notificationService = notificationService;
    }
    async getDashboardStatistics(pulseLeaderId) {
        const currentMonth = new Date();
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const [activeDonors, escalations, donations, emergencies, responseTime] = await Promise.all([
            this.userModel.countDocuments({
                isAvailable: true,
                role: "DONOR",
                geoLocation: { $exists: true },
            }),
            this.bloodRequestModel.countDocuments({
                donorResponseStatus: "ESCALATED",
                createdAt: { $gte: monthStart, $lte: monthEnd },
            }),
            this.bloodRequestModel.countDocuments({
                status: "FULFILLED",
                createdAt: { $gte: monthStart, $lte: monthEnd },
            }),
            this.bloodRequestModel.countDocuments({
                priorityLevel: "CRITICAL",
                createdAt: { $gte: monthStart, $lte: monthEnd },
            }),
            this.calculateAverageResponseTime(monthStart, monthEnd),
        ]);
        const escalationRate = escalations > 0 ? (donations / escalations) * 100 : 0;
        return {
            activeDonors,
            avgResponseTime: responseTime,
            escalationFulfillmentRate: escalationRate,
            totalRequests: escalations,
            totalDonations: donations,
            newDonorsRecruited: 8,
            emergenciesHandled: emergencies,
        };
    }
    async calculateAverageResponseTime(startDate, endDate) {
        const requests = await this.bloodRequestModel
            .find({
            createdAt: { $gte: startDate, $lte: endDate },
            assignedDonors: { $exists: true, $ne: [] },
        })
            .select("createdAt updatedAt")
            .lean();
        if (requests.length === 0)
            return "0m 0s";
        const totalMs = requests.reduce((acc, req) => {
            const createdTime = new Date(req.createdAt).getTime();
            const acceptedTime = new Date(req.updatedAt).getTime();
            return acc + (acceptedTime - createdTime);
        }, 0);
        const avgMs = Math.floor(totalMs / requests.length);
        const minutes = Math.floor(avgMs / 60000);
        const seconds = Math.floor((avgMs % 60000) / 1000);
        return `${minutes}m ${seconds}s`;
    }
    async getMonthlyMetrics(pulseLeaderId, month) {
        const targetMonth = month || new Date();
        const startDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);
        const endDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0);
        const metrics = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayStart = new Date(currentDate);
            const dayEnd = new Date(currentDate);
            dayEnd.setHours(23, 59, 59, 999);
            const [donations, requests] = await Promise.all([
                this.bloodRequestModel.countDocuments({
                    status: "FULFILLED",
                    createdAt: { $gte: dayStart, $lte: dayEnd },
                }),
                this.bloodRequestModel.countDocuments({
                    createdAt: { $gte: dayStart, $lte: dayEnd },
                }),
            ]);
            metrics.push({
                month: currentDate.toLocaleDateString("en-US", { month: "short" }),
                donations,
                requests,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return metrics;
    }
    async searchDonors(filters, pulseLeaderId) {
        const query = { role: "DONOR" };
        if (filters.bloodType) {
            query.bloodGroup = filters.bloodType;
        }
        if (filters.availability) {
            query.isAvailable = filters.availability === "Available";
        }
        if (filters.coordinates && filters.radiusKm) {
            query.geoLocation = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: filters.coordinates,
                    },
                    $maxDistance: filters.radiusKm * 1000,
                },
            };
        }
        const skip = filters.skip || 0;
        const limit = filters.limit || 20;
        const donors = await this.userModel
            .find(query)
            .select("_id fullName bloodGroup genotype geoLocation lastDonationDate isAvailable phoneNumber email")
            .skip(skip)
            .limit(limit)
            .lean();
        return donors.map((donor) => {
            var _a;
            return ({
                id: donor._id.toString(),
                name: donor.fullName,
                bloodType: donor.bloodGroup || "Unknown",
                genotype: donor.genotype || "N/A",
                distanceKm: this.calculateDistance(filters.coordinates, (_a = donor.geoLocation) === null || _a === void 0 ? void 0 : _a.coordinates),
                lastDonatedDate: donor.lastDonationDate
                    ? new Date(donor.lastDonationDate).toLocaleDateString()
                    : "Never",
                availability: donor.isAvailable ? "Available" : "Unavailable",
                phone: donor.phoneNumber || "N/A",
                email: donor.email,
            });
        });
    }
    calculateDistance(coords1, coords2) {
        if (!coords1 || !coords2)
            return 0;
        const [lon1, lat1] = coords1;
        const [lon2, lat2] = coords2;
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 10) / 10;
    }
    async broadcastMessage(broadcastDto, pulseLeaderId) {
        var _a;
        const request = await this.bloodRequestModel.findById(broadcastDto.requestId).lean();
        if (!request) {
            throw new common_1.NotFoundException("Blood request not found");
        }
        let recipients = [];
        if (((_a = broadcastDto.recipientDonorIds) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            recipients = await this.userModel.find({
                _id: { $in: broadcastDto.recipientDonorIds },
                role: "DONOR",
            }).lean();
        }
        else {
            const query = { role: "DONOR" };
            if (broadcastDto.bloodType) {
                query.bloodGroup = broadcastDto.bloodType;
            }
            if (broadcastDto.coordinates && broadcastDto.radiusKm) {
                query.geoLocation = {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: broadcastDto.coordinates,
                        },
                        $maxDistance: broadcastDto.radiusKm * 1000,
                    },
                };
            }
            recipients = await this.userModel.find(query).select("_id phoneNumber email").lean();
        }
        const broadcastMessage = {
            id: `msg_${Date.now()}`,
            requestId: broadcastDto.requestId,
            pulseLeaderId,
            messageContent: broadcastDto.messageContent,
            deliveryStatus: "sent",
            sentAt: new Date().toISOString(),
            recipientCount: recipients.length,
            deliveredCount: 0,
            readCount: 0,
        };
        recipients.forEach((recipient) => {
            this.notificationGateway.broadcastBloodRequest({
                type: "BROADCAST_ALERT",
                requestId: broadcastDto.requestId,
                bloodType: request.bloodType,
                unitsNeeded: request.unitsNeeded,
                priorityLevel: request.priorityLevel,
                message: broadcastDto.messageContent,
            }, recipient._id.toString());
        });
        try {
            const recipientIds = recipients.map(r => r._id.toString());
            await this.notificationService.sendNotificationToMultipleUsers(recipientIds, {
                title: "📢 Pulse Leader Broadcast",
                body: broadcastDto.messageContent,
                type: "general",
                data: {
                    requestId: broadcastDto.requestId,
                    pulseLeaderId
                }
            });
        }
        catch (error) {
            console.error("Failed to send broadcast email notifications", error);
        }
        return broadcastMessage;
    }
    async getEscalationHistory(pulseLeaderId, limit = 5) {
        const escalations = await this.bloodRequestModel
            .find({ donorResponseStatus: "ESCALATED" })
            .sort({ createdAt: -1 })
            .limit(limit)
            .select("bloodType priorityLevel createdAt status unitsConfirmed")
            .lean();
        return escalations.map((esc) => ({
            id: esc._id.toString(),
            bloodType: esc.bloodType,
            urgency: esc.priorityLevel,
            posted: new Date(esc.createdAt).toISOString(),
            outcome: esc.status === "FULFILLED" ? "Fulfilled" : "Pending",
            donorsResponded: esc.unitsConfirmed || 0,
        }));
    }
    async getRecentActivities(pulseLeaderId, limit = 10) {
        const activities = await this.bloodRequestModel
            .find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("createdBy", "fullName")
            .select("bloodType unitsNeeded status createdAt")
            .lean();
        return activities.map((activity) => {
            var _a;
            return ({
                id: activity._id.toString(),
                activityType: "BLOOD_REQUEST",
                description: activity.status === "FULFILLED"
                    ? `Coordinated ${activity.unitsNeeded} units of ${activity.bloodType}`
                    : `Posted request for ${activity.unitsNeeded} units of ${activity.bloodType}`,
                actor: ((_a = activity.createdBy) === null || _a === void 0 ? void 0 : _a.fullName) || "Unknown",
                timestamp: new Date(activity.createdAt).toISOString(),
                bloodType: activity.bloodType,
                units: activity.unitsNeeded,
            });
        });
    }
    async getRequestFulfillmentBreakdown(pulseLeaderId, filterBy = "bloodType") {
        const requests = await this.bloodRequestModel.find({}).lean();
        const grouped = requests.reduce((acc, req) => {
            const key = filterBy === "bloodType" ? req.bloodType : req.priorityLevel;
            if (!acc[key]) {
                acc[key] = { total: 0, fulfilled: 0 };
            }
            acc[key].total++;
            if (req.status === "FULFILLED") {
                acc[key].fulfilled++;
            }
            return acc;
        }, {});
        return Object.entries(grouped).map(([label, data]) => ({
            label,
            value: data.total > 0 ? (data.fulfilled / data.total) * 100 : 0,
            status: data.fulfilled / data.total > 0.8 ? "Good" : data.fulfilled / data.total > 0.5 ? "Fair" : "Critical",
        }));
    }
    async getPulseLeaderDashboard(pulseLeaderId) {
        const [statistics, monthlyMetrics, recentRequests, activities, fulfillmentByBlood, fulfillmentByUrgency] = await Promise.all([
            this.getDashboardStatistics(pulseLeaderId),
            this.getMonthlyMetrics(pulseLeaderId),
            this.bloodRequestModel
                .find({ status: { $in: ["PENDING", "ACCEPTED"] } })
                .limit(5)
                .sort({ createdAt: -1 })
                .lean(),
            this.getRecentActivities(pulseLeaderId),
            this.getRequestFulfillmentBreakdown(pulseLeaderId, "bloodType"),
            this.getRequestFulfillmentBreakdown(pulseLeaderId, "urgency"),
        ]);
        return {
            statistics,
            monthlyMetrics,
            recentBloodRequests: recentRequests,
            recentActivities: activities,
            requestFulfillmentByBloodType: fulfillmentByBlood,
            requestFulfillmentByUrgency: fulfillmentByUrgency,
        };
    }
};
exports.PulseLeaderService = PulseLeaderService;
exports.PulseLeaderService = PulseLeaderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blood_request_schema_1.BloodRequest.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notification_gateway_1.NotificationGateway,
        notification_service_1.NotificationService])
], PulseLeaderService);
//# sourceMappingURL=pulse-leader.service.js.map