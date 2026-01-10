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
exports.DonorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const blood_request_schema_1 = require("../blood-request/schema/blood-request.schema");
const donation_request_type_1 = require("./types/donation-request.type");
const resource_type_1 = require("./types/resource.type");
let DonorService = class DonorService {
    constructor(userModel, bloodRequestModel) {
        this.userModel = userModel;
        this.bloodRequestModel = bloodRequestModel;
    }
    async getDonorDashboard(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error("User not found");
        const profileCompletion = this.calculateProfileCompletion(user);
        const donorStatus = this.getDonorStatus(user);
        const impact = await this.calculateDonorImpact(userId);
        const achievements = await this.getUserAchievements(userId);
        const nearbyRequests = await this.getNearbyBloodRequests(userId, 50);
        const donationHistory = await this.getDonationHistory(userId, 5);
        const communityActivity = await this.getCommunityActivity();
        return {
            welcomeMessage: `Welcome back, ${user.fullName}! 👋`,
            profileCompletion,
            donorStatus,
            impact,
            achievements,
            nearbyBloodRequests: nearbyRequests,
            donationHistory,
            communityActivity,
        };
    }
    async getDonorProfile(userId) {
        var _a, _b, _c, _d;
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error("User not found");
        const latitude = ((_b = (_a = user.geoLocation) === null || _a === void 0 ? void 0 : _a.coordinates) === null || _b === void 0 ? void 0 : _b[1]) || 0;
        const longitude = ((_d = (_c = user.geoLocation) === null || _c === void 0 ? void 0 : _c.coordinates) === null || _d === void 0 ? void 0 : _d[0]) || 0;
        return {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            phone: user.phoneNumber || "",
            bloodType: user.bloodGroup || "",
            genotype: user.genotype,
            gender: user.gender,
            latitude,
            longitude,
            availability: user.isAvailable ? "Available" : "Unavailable",
            emergencyContact: user.emergencyContact,
            emergencyContactPhone: user.emergencyContactPhone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async updateProfile(userId, input) {
        const updateData = {};
        if (input.fullName)
            updateData.fullName = input.fullName;
        if (input.phone)
            updateData.phoneNumber = input.phone;
        if (input.bloodType)
            updateData.bloodGroup = input.bloodType;
        if (input.genotype)
            updateData.genotype = input.genotype;
        if (input.gender)
            updateData.gender = input.gender;
        if (input.emergencyContact)
            updateData.emergencyContact = input.emergencyContact;
        if (input.emergencyContactPhone)
            updateData.emergencyContactPhone = input.emergencyContactPhone;
        if (input.latitude !== undefined && input.longitude !== undefined) {
            updateData.geoLocation = {
                type: "Point",
                coordinates: [input.longitude, input.latitude],
            };
        }
        if (input.availability) {
            updateData.isAvailable = input.availability === "Available";
        }
        const user = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user)
            throw new Error("User not found");
        return this.getDonorProfile(userId);
    }
    async updateAvailability(userId, input) {
        const isAvailable = input.status === "Available";
        const user = await this.userModel.findByIdAndUpdate(userId, { isAvailable }, { new: true });
        if (!user)
            throw new Error("User not found");
        return this.getDonorProfile(userId);
    }
    async getNotificationPreferences(userId) {
        return {
            id: userId,
            userId,
            emergencyAlerts: true,
            donationReminders: true,
            communityUpdates: false,
            reminderFrequency: "daily",
            updatedAt: new Date(),
        };
    }
    async updateNotificationPreferences(userId, input) {
        return this.getNotificationPreferences(userId);
    }
    async getNearbyBloodRequests(userId, radiusKm) {
        var _a, _b, _c, _d;
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error("User not found");
        const userLat = (_b = (_a = user.geoLocation) === null || _a === void 0 ? void 0 : _a.coordinates) === null || _b === void 0 ? void 0 : _b[1];
        const userLng = (_d = (_c = user.geoLocation) === null || _c === void 0 ? void 0 : _c.coordinates) === null || _d === void 0 ? void 0 : _d[0];
        const requests = await this.bloodRequestModel
            .find({
            status: "PENDING",
            bloodType: user.bloodGroup,
        })
            .populate("createdBy", "fullName facilityName")
            .limit(10)
            .lean();
        return requests.map((req) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const reqLat = ((_c = (_b = (_a = req.createdBy) === null || _a === void 0 ? void 0 : _a.geoLocation) === null || _b === void 0 ? void 0 : _b.coordinates) === null || _c === void 0 ? void 0 : _c[1]) || 0;
            const reqLng = ((_f = (_e = (_d = req.createdBy) === null || _d === void 0 ? void 0 : _d.geoLocation) === null || _e === void 0 ? void 0 : _e.coordinates) === null || _f === void 0 ? void 0 : _f[0]) || 0;
            const distance = userLat && userLng
                ? this.calculateDistance(userLat, userLng, reqLat, reqLng)
                : 0;
            return {
                id: req._id.toString(),
                bloodType: req.bloodType,
                priority: req.priorityLevel,
                unitsNeeded: req.unitsNeeded,
                hospitalName: ((_g = req.createdBy) === null || _g === void 0 ? void 0 : _g.facilityName) || "Unknown Hospital",
                address: ((_h = req.createdBy) === null || _h === void 0 ? void 0 : _h.facilityName) || "",
                contactPhone: req.contactPhone || "",
                instructions: req.additionalNotes || "",
                createdAt: req.createdAt,
                status: donation_request_type_1.DonationProgressStatusEnum.ACCEPTED,
                distance,
            };
        });
    }
    async getBloodRequestDetails(requestId) {
        const request = await this.bloodRequestModel
            .findById(requestId)
            .populate("createdBy", "fullName facilityName contactPhone")
            .lean();
        if (!request)
            throw new Error("Request not found");
        const createdBy = request.createdBy;
        return {
            id: request._id.toString(),
            bloodType: request.bloodType,
            priority: request.priorityLevel,
            unitsNeeded: request.unitsNeeded,
            hospitalName: (createdBy === null || createdBy === void 0 ? void 0 : createdBy.facilityName) || "Unknown Hospital",
            address: (createdBy === null || createdBy === void 0 ? void 0 : createdBy.facilityName) || "",
            contactPhone: request.contactPhone || "",
            instructions: request.additionalNotes || "",
            createdAt: request.createdAt,
            status: donation_request_type_1.DonationProgressStatusEnum.ACCEPTED,
            distance: 0,
        };
    }
    async acceptBloodRequest(userId, input) {
        const request = await this.bloodRequestModel.findById(input.requestId);
        if (!request)
            throw new Error("Request not found");
        if (!request.assignedDonors) {
            request.assignedDonors = [];
        }
        const userObjectId = userId;
        if (!request.assignedDonors.some(id => id.toString() === userId)) {
            request.assignedDonors.push(userObjectId);
        }
        request.status = "ACCEPTED";
        await request.save();
        return {
            requestId: request._id.toString(),
            status: donation_request_type_1.DonationProgressStatusEnum.ACCEPTED,
            timestamp: new Date(),
            location: `${input.latitude},${input.longitude}`,
        };
    }
    async rejectBloodRequest(userId, input) {
    }
    async updateDonationProgress(userId, input) {
        const request = await this.bloodRequestModel.findById(input.requestId);
        if (!request)
            throw new Error("Request not found");
        if (input.status === donation_request_type_1.DonationProgressStatusEnum.DONATION_COMPLETE) {
            request.status = "FULFILLED";
            request.unitsConfirmed += 1;
            request.fulfillmentDate = new Date();
            const donor = await this.userModel.findById(userId);
            if (donor) {
                donor.donationCount = (donor.donationCount || 0) + 1;
                donor.lastDonationDate = new Date();
                await donor.save();
            }
        }
        await request.save();
        return {
            requestId: request._id.toString(),
            status: input.status,
            timestamp: new Date(),
            location: input.location,
            estimatedArrivalTime: input.estimatedArrivalTime,
        };
    }
    async getDonationHistory(userId, limit) {
        const history = await this.bloodRequestModel
            .find({
            assignedDonors: userId,
            status: { $in: ["FULFILLED", "ACCEPTED"] }
        })
            .populate("createdBy", "fullName facilityName contactPhone")
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();
        return history.map((req) => {
            const createdBy = req.createdBy || {};
            return {
                id: req._id.toString(),
                hospitalName: createdBy.facilityName || "Unknown Hospital",
                bloodType: req.bloodType,
                unitsGiven: 1,
                donatedAt: req.fulfillmentDate || req.createdAt,
                status: req.status,
                facilityName: createdBy.facilityName || "",
                facilityAddress: createdBy.facilityName || "",
                facilityPhone: req.contactPhone || "",
            };
        });
    }
    async getResources(category, searchQuery) {
        const allResources = [
            {
                id: "1",
                title: "Blood Donation 101",
                description: "A 7 series course on everything you need to know about the blood donation process",
                category: resource_type_1.ResourceCategoryEnum.COURSES,
                imageUrl: "/images/blood-donation-101.png",
                duration: "5 Mins",
                actionText: "Take course",
                actionUrl: "/courses/blood-donation-101",
                isFeatured: true,
                createdAt: new Date(),
            },
            {
                id: "2",
                title: "Post-Donation Care",
                description: "Learn how to take care of yourself after donating blood",
                category: resource_type_1.ResourceCategoryEnum.ARTICLES,
                imageUrl: "/images/post-donation-care.png",
                duration: "3 Mins",
                actionText: "Read article",
                actionUrl: "/articles/post-donation-care",
                isFeatured: false,
                createdAt: new Date(),
            },
        ];
        let filtered = category === resource_type_1.ResourceCategoryEnum.ALL ? allResources : allResources.filter((r) => r.category === category);
        if (searchQuery) {
            filtered = filtered.filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return {
            resources: filtered,
            totalCount: filtered.length,
            categories: Object.values(resource_type_1.ResourceCategoryEnum),
        };
    }
    async submitFeedback(userId, input) {
        return {
            id: new Date().getTime().toString(),
            requestId: input.requestId,
            rating: input.rating,
            comments: input.comments,
            submittedAt: new Date(),
        };
    }
    calculateProfileCompletion(user) {
        const fields = [
            "fullName",
            "email",
            "phoneNumber",
            "bloodGroup",
            "genotype",
            "geoLocation",
            "emergencyContact"
        ];
        const completed = fields.filter((field) => {
            const value = user[field];
            if (field === "geoLocation") {
                return value && value.coordinates && value.coordinates.length === 2;
            }
            return value !== undefined && value !== null && value !== "";
        });
        const percent = Math.round((completed.length / fields.length) * 100);
        return {
            percentComplete: percent,
            completedFields: completed,
            remainingFields: fields.filter((f) => !completed.includes(f)),
        };
    }
    getDonorStatus(user) {
        return {
            availability: user.isAvailable ? "Available" : "Unavailable",
            bloodType: user.bloodGroup || "Unknown",
            nextEligibilityDate: this.calculateNextEligibilityDate(user),
            lastDonationDate: user.lastDonationDate,
        };
    }
    calculateNextEligibilityDate(user) {
        const daysBetweenDonations = user.gender === "male" ? 56 : 112;
        if (!user.lastDonationDate)
            return new Date();
        const nextDate = new Date(user.lastDonationDate);
        nextDate.setDate(nextDate.getDate() + daysBetweenDonations);
        return nextDate;
    }
    async getMedicalEligibility(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error("User not found");
        const nextEligibleDate = this.calculateNextEligibilityDate(user);
        const today = new Date();
        const isEligible = today >= nextEligibleDate;
        const daysSinceLastDonation = user.lastDonationDate
            ? Math.floor((today.getTime() - user.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24))
            : 999;
        const daysUntilEligible = Math.max(0, Math.floor((nextEligibleDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        return {
            isEligible,
            nextEligibleDate,
            reason: isEligible ? undefined : "Still in waiting period between donations",
            daysSinceLastDonation,
            daysUntilEligible,
        };
    }
    async calculateDonorImpact(userId) {
        const donations = await this.bloodRequestModel.countDocuments({
            assignedDonors: userId,
            status: "FULFILLED",
        });
        return {
            totalDonations: donations,
            livesImpacted: donations * 3,
            emergenciesHandled: Math.floor(donations * 0.3),
            newDonorsRecruited: Math.floor(donations * 0.1),
        };
    }
    async getUserAchievements(userId) {
        const donations = await this.bloodRequestModel.countDocuments({
            assignedDonors: userId,
            status: "FULFILLED",
        });
        const achievements = [];
        if (donations >= 1) {
            achievements.push({
                id: "bronze",
                name: "Bronze Lifesaver",
                description: "5 donations completed",
                badge: "🥉",
                unlockedAt: new Date(),
                level: 1,
                streakDays: 0,
            });
        }
        if (donations >= 5) {
            achievements.push({
                id: "silver",
                name: "Silver Lifesaver",
                description: "10 donations completed",
                badge: "🥈",
                unlockedAt: new Date(),
                level: 2,
                streakDays: 0,
            });
        }
        return achievements;
    }
    async getCommunityActivity() {
        return [
            {
                id: "1",
                message: "donated O+ blood at City General Hospital",
                actorName: "John A.",
                timestamp: new Date(),
                icon: "❤️",
            },
        ];
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 10) / 10;
    }
};
exports.DonorService = DonorService;
exports.DonorService = DonorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(blood_request_schema_1.BloodRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DonorService);
//# sourceMappingURL=donor.service.js.map