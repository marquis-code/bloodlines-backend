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
exports.BloodRequestGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const blood_request_schema_1 = require("./schema/blood-request.schema");
const role_enum_1 = require("../../common/enums/role.enum");
let BloodRequestGateway = class BloodRequestGateway {
    constructor(jwtService, userModel, bloodRequestModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.bloodRequestModel = bloodRequestModel;
        this.connectedUsers = new Map();
    }
    async handleConnection(client) {
        var _a;
        try {
            const token = client.handshake.auth.token || ((_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token);
            const user = await this.userModel.findById(payload.sub);
            if (!user) {
                client.disconnect();
                return;
            }
            this.connectedUsers.set(client.id, {
                userId: user._id.toString(),
                socketId: client.id,
                role: user.role,
                bloodGroup: user.bloodGroup,
                isAvailable: user.role === role_enum_1.UserRole.DONOR ? user.isAvailable : undefined,
            });
            client.join(`user:${user._id}`);
            if (user.role === role_enum_1.UserRole.DONOR && user.isAvailable) {
                client.join("available-donors");
                client.join(`blood-group:${user.bloodGroup}`);
            }
            if (user.role === role_enum_1.UserRole.BRIDGER) {
                client.join("bridgers");
            }
            console.log(`User ${user.email} connected with socket ${client.id}`);
            client.emit("connected", {
                message: "Successfully connected to blood request system",
                userId: user._id,
            });
        }
        catch (error) {
            console.error("Connection error:", error);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const user = this.connectedUsers.get(client.id);
        if (user) {
            console.log(`User ${user.userId} disconnected`);
            this.connectedUsers.delete(client.id);
        }
    }
    async handleLocationUpdate(data, client) {
        const user = this.connectedUsers.get(client.id);
        if (user) {
            user.location = data;
            await this.userModel.findByIdAndUpdate(user.userId, {
                geoLocation: {
                    type: "Point",
                    coordinates: [data.lng, data.lat],
                },
            });
            return { success: true, message: "Location updated" };
        }
        return { success: false, message: "User not found" };
    }
    async handleAvailabilityUpdate(data, client) {
        const user = this.connectedUsers.get(client.id);
        if (user && user.role === role_enum_1.UserRole.DONOR) {
            user.isAvailable = data.isAvailable;
            await this.userModel.findByIdAndUpdate(user.userId, {
                isAvailable: data.isAvailable,
            });
            if (data.isAvailable) {
                client.join("available-donors");
                client.join(`blood-group:${user.bloodGroup}`);
            }
            else {
                client.leave("available-donors");
                client.leave(`blood-group:${user.bloodGroup}`);
            }
            return { success: true, message: "Availability updated" };
        }
        return { success: false, message: "Invalid user or role" };
    }
    async notifyNearbyDonors(bloodRequest, bridgerLocation) {
        const nearbyDonors = await this.findNearbyDonors(bloodRequest.bloodType, bridgerLocation, 50);
        nearbyDonors.forEach(donor => {
            const socketId = this.getSocketIdByUserId(donor._id.toString());
            if (socketId) {
                this.server.to(socketId).emit("newBloodRequest", {
                    requestId: bloodRequest._id,
                    bloodType: bloodRequest.bloodType,
                    priorityLevel: bloodRequest.priorityLevel,
                    unitsNeeded: bloodRequest.unitsNeeded,
                    contactPhone: bloodRequest.contactPhone,
                    additionalNotes: bloodRequest.additionalNotes,
                    distance: this.calculateDistance(bridgerLocation, donor.geoLocation),
                    createdBy: {
                        fullName: bloodRequest.createdBy.fullName,
                        facilityName: bloodRequest.createdBy.facilityName,
                    },
                    createdAt: bloodRequest.createdAt,
                });
            }
        });
        this.server.to(`blood-group:${bloodRequest.bloodType}`).emit("newBloodRequest", {
            requestId: bloodRequest._id,
            bloodType: bloodRequest.bloodType,
            priorityLevel: bloodRequest.priorityLevel,
            unitsNeeded: bloodRequest.unitsNeeded,
            contactPhone: bloodRequest.contactPhone,
            additionalNotes: bloodRequest.additionalNotes,
            createdBy: {
                fullName: bloodRequest.createdBy.fullName,
                facilityName: bloodRequest.createdBy.facilityName,
            },
            createdAt: bloodRequest.createdAt,
        });
    }
    async notifyDonorAcceptance(requestId, donorId) {
        const request = await this.bloodRequestModel
            .findById(requestId)
            .populate("createdBy");
        const donor = await this.userModel.findById(donorId);
        if (!request || !donor)
            return;
        const createdBy = request.createdBy;
        this.server.to(`user:${createdBy._id}`).emit("donorAccepted", {
            requestId: request._id,
            donor: {
                id: donor._id,
                fullName: donor.fullName,
                bloodGroup: donor.bloodGroup,
                phoneNumber: donor.phoneNumber,
            },
            unitsConfirmed: request.unitsConfirmed,
            unitsNeeded: request.unitsNeeded,
            timestamp: new Date(),
        });
        this.server.to(`user:${donorId}`).emit("acceptanceConfirmed", {
            requestId: request._id,
            message: "Your acceptance has been confirmed",
            bridger: {
                fullName: createdBy.fullName,
                facilityName: createdBy.facilityName,
                contactPhone: request.contactPhone,
            },
            timestamp: new Date(),
        });
    }
    async notifyRequestFulfilled(requestId) {
        const request = await this.bloodRequestModel
            .findById(requestId)
            .populate("createdBy")
            .populate("assignedDonors");
        if (!request)
            return;
        const createdBy = request.createdBy;
        this.server.to(`user:${createdBy._id}`).emit("requestFulfilled", {
            requestId: request._id,
            message: "Blood request has been fulfilled",
            unitsConfirmed: request.unitsConfirmed,
            unitsNeeded: request.unitsNeeded,
            fulfillmentDate: request.fulfillmentDate,
        });
        if (request.assignedDonors) {
            request.assignedDonors.forEach((donor) => {
                this.server.to(`user:${donor._id}`).emit("requestFulfilled", {
                    requestId: request._id,
                    message: "The blood request you responded to has been fulfilled",
                    timestamp: new Date(),
                });
            });
        }
    }
    async notifyDonorArrival(requestId, donorId) {
        const request = await this.bloodRequestModel
            .findById(requestId)
            .populate("createdBy");
        const donor = await this.userModel.findById(donorId);
        if (!request || !donor)
            return;
        const createdBy = request.createdBy;
        this.server.to(`user:${createdBy._id}`).emit("donorArrived", {
            requestId: request._id,
            donor: {
                id: donor._id,
                fullName: donor.fullName,
                bloodGroup: donor.bloodGroup,
            },
            message: `${donor.fullName} has arrived at the hospital`,
            timestamp: new Date(),
        });
    }
    async broadcastRequestUpdate(requestId) {
        const request = await this.bloodRequestModel
            .findById(requestId)
            .populate("createdBy")
            .populate("assignedDonors");
        if (!request)
            return;
        const createdBy = request.createdBy;
        const updateData = {
            requestId: request._id,
            status: request.status,
            unitsConfirmed: request.unitsConfirmed,
            unitsNeeded: request.unitsNeeded,
            donorResponseStatus: request.donorResponseStatus,
            timestamp: new Date(),
        };
        this.server.to(`user:${createdBy._id}`).emit("requestUpdated", updateData);
        if (request.assignedDonors) {
            request.assignedDonors.forEach((donor) => {
                this.server.to(`user:${donor._id}`).emit("requestUpdated", updateData);
            });
        }
    }
    getSocketIdByUserId(userId) {
        for (const [socketId, user] of this.connectedUsers.entries()) {
            if (user.userId === userId) {
                return socketId;
            }
        }
        return undefined;
    }
    async findNearbyDonors(bloodType, location, radiusKm) {
        return this.userModel.find({
            role: role_enum_1.UserRole.DONOR,
            bloodGroup: bloodType,
            isAvailable: true,
            geoLocation: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [location.lng, location.lat],
                    },
                    $maxDistance: radiusKm * 1000,
                },
            },
        });
    }
    calculateDistance(point1, point2) {
        if (!(point2 === null || point2 === void 0 ? void 0 : point2.coordinates))
            return 0;
        const R = 6371;
        const dLat = this.deg2rad(point2.coordinates[1] - point1.lat);
        const dLon = this.deg2rad(point2.coordinates[0] - point1.lng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(point1.lat)) *
                Math.cos(this.deg2rad(point2.coordinates[1])) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
};
exports.BloodRequestGateway = BloodRequestGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BloodRequestGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("updateLocation"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], BloodRequestGateway.prototype, "handleLocationUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updateAvailability"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], BloodRequestGateway.prototype, "handleAvailabilityUpdate", null);
exports.BloodRequestGateway = BloodRequestGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
            credentials: true,
        },
        namespace: "/blood-requests",
    }),
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(blood_request_schema_1.BloodRequest.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], BloodRequestGateway);
//# sourceMappingURL=blood-request.gateway.js.map