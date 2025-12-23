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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const blood_type_enum_1 = require("../../common/enums/blood-type.enum");
const priority_level_enum_1 = require("../../common/enums/priority-level.enum");
const blood_request_schema_1 = require("../blood-request/schema/blood-request.schema");
let AnalyticsService = class AnalyticsService {
    constructor(bloodRequestModel, userModel) {
        this.bloodRequestModel = bloodRequestModel;
        this.userModel = userModel;
    }
    async getTotalRequests() {
        return this.bloodRequestModel.countDocuments();
    }
    async getBloodInventory() {
        const inventory = {};
        for (const bloodType of Object.values(blood_type_enum_1.BloodType)) {
            const count = await this.bloodRequestModel.countDocuments({
                bloodType,
                status: { $ne: "FULFILLED" },
            });
            inventory[bloodType] = count;
        }
        return inventory;
    }
    async getRequestsFulfillmentByBloodType() {
        const bloodTypes = Object.values(blood_type_enum_1.BloodType);
        const data = [];
        for (const bloodType of bloodTypes) {
            const total = await this.bloodRequestModel.countDocuments({ bloodType });
            const fulfilled = await this.bloodRequestModel.countDocuments({
                bloodType,
                status: "FULFILLED",
            });
            const percentage = total > 0 ? Math.round((fulfilled / total) * 100) : 0;
            data.push({
                bloodType,
                percentage,
                total,
                fulfilled,
            });
        }
        return data;
    }
    async getRequestsFulfillmentByUrgency() {
        const urgencyLevels = Object.values(priority_level_enum_1.PriorityLevel);
        const data = [];
        for (const level of urgencyLevels) {
            const total = await this.bloodRequestModel.countDocuments({
                priorityLevel: level,
            });
            const fulfilled = await this.bloodRequestModel.countDocuments({
                priorityLevel: level,
                status: "FULFILLED",
            });
            const percentage = total > 0 ? Math.round((fulfilled / total) * 100) : 0;
            data.push({
                urgency: level,
                percentage,
                total,
                fulfilled,
            });
        }
        return data;
    }
    async getAverageResponseTime() {
        const requests = await this.bloodRequestModel.find({ fulfillmentDate: { $exists: true } }).lean();
        if (requests.length === 0)
            return "0m";
        const totalMinutes = requests.reduce((sum, req) => {
            const createdTime = new Date(req.createdAt).getTime();
            const fulfillmentTime = new Date(req.fulfillmentDate).getTime();
            const diffMinutes = Math.floor((fulfillmentTime - createdTime) / (1000 * 60));
            return sum + diffMinutes;
        }, 0);
        const avgMinutes = Math.floor(totalMinutes / requests.length);
        const hours = Math.floor(avgMinutes / 60);
        const minutes = avgMinutes % 60;
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
    async getDonorResponseStats() {
        const total = await this.bloodRequestModel.countDocuments();
        const accepted = await this.bloodRequestModel.countDocuments({
            donorResponseStatus: "ACCEPTED",
        });
        const escalated = await this.bloodRequestModel.countDocuments({
            donorResponseStatus: "ESCALATED",
        });
        const noResponse = total - accepted - escalated;
        return {
            total,
            accepted: {
                count: accepted,
                percentage: total > 0 ? Math.round((accepted / total) * 100) : 0,
            },
            escalated: {
                count: escalated,
                percentage: total > 0 ? Math.round((escalated / total) * 100) : 0,
            },
            noResponse: {
                count: noResponse,
                percentage: total > 0 ? Math.round((noResponse / total) * 100) : 0,
            },
        };
    }
    async getTopBridgers(limit = 10) {
        const bridgers = await this.bloodRequestModel.aggregate([
            {
                $match: { status: "FULFILLED" },
            },
            {
                $group: {
                    _id: "$createdBy",
                    requestCount: { $sum: 1 },
                    totalUnitsConfirmed: { $sum: "$unitsConfirmed" },
                },
            },
            {
                $sort: { requestCount: -1 },
            },
            {
                $limit: limit,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $project: {
                    _id: "$_id",
                    name: "$user.fullName",
                    facilityName: "$user.facilityName",
                    requestCount: 1,
                    totalUnitsConfirmed: 1,
                },
            },
        ]);
        return bridgers;
    }
    async getRequestFulfillmentTimeSeries(months = 6) {
        const monthsAgo = new Date();
        monthsAgo.setMonth(monthsAgo.getMonth() - months);
        const data = await this.bloodRequestModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: monthsAgo },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 },
            },
        ]);
        return data.map((item) => ({
            month: `${item._id.month}/${item._id.year}`,
            count: item.count,
        }));
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(blood_request_schema_1.BloodRequest.name)),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map