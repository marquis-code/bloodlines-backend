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
exports.BloodRequestResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const blood_request_service_1 = require("./blood-request.service");
const blood_request_type_1 = require("./types/blood-request.type");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const create_blood_request_dto_1 = require("./dtos/create-blood-request.dto");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const priority_level_enum_1 = require("../../common/enums/priority-level.enum");
let BloodRequestResolver = class BloodRequestResolver {
    constructor(bloodRequestService) {
        this.bloodRequestService = bloodRequestService;
    }
    async createBloodRequest(user, createDto) {
        return this.bloodRequestService.createBloodRequest(user.sub, createDto);
    }
    async getActiveRequests(limit, skip) {
        return this.bloodRequestService.getActiveRequests(limit, skip);
    }
    async getAllRequests(limit, skip) {
        return this.bloodRequestService.getAllRequests(limit, skip);
    }
    async getMyRequests(user, limit, skip) {
        return this.bloodRequestService.getRequestsByUser(user.sub, limit, skip);
    }
    async confirmDonation(user, requestId) {
        return this.bloodRequestService.confirmDonation(requestId, user.sub);
    }
    async updateBloodRequest(user, requestId, priorityLevel, unitsNeeded, contactPhone, additionalNotes) {
        return this.bloodRequestService.updateRequest(requestId, user.sub, {
            priorityLevel,
            unitsNeeded,
            contactPhone,
            additionalNotes,
        });
    }
};
exports.BloodRequestResolver = BloodRequestResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => blood_request_type_1.BloodRequestType),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_blood_request_dto_1.CreateBloodRequestDto]),
    __metadata("design:returntype", Promise)
], BloodRequestResolver.prototype, "createBloodRequest", null);
__decorate([
    (0, graphql_1.Query)(() => [blood_request_type_1.BloodRequestType]),
    __param(0, (0, graphql_1.Args)("limit", { defaultValue: 10 })),
    __param(1, (0, graphql_1.Args)("skip", { defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BloodRequestResolver.prototype, "getActiveRequests", null);
__decorate([
    (0, graphql_1.Query)(() => [blood_request_type_1.BloodRequestType]),
    __param(0, (0, graphql_1.Args)("limit", { defaultValue: 10 })),
    __param(1, (0, graphql_1.Args)("skip", { defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BloodRequestResolver.prototype, "getAllRequests", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [blood_request_type_1.BloodRequestType]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)("limit", { defaultValue: 10 })),
    __param(2, (0, graphql_1.Args)("skip", { defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], BloodRequestResolver.prototype, "getMyRequests", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => blood_request_type_1.BloodRequestType),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)("requestId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BloodRequestResolver.prototype, "confirmDonation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => blood_request_type_1.BloodRequestType),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)("requestId")),
    __param(2, (0, graphql_1.Args)("priorityLevel", { nullable: true })),
    __param(3, (0, graphql_1.Args)("unitsNeeded", { nullable: true })),
    __param(4, (0, graphql_1.Args)("contactPhone", { nullable: true })),
    __param(5, (0, graphql_1.Args)("additionalNotes", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], BloodRequestResolver.prototype, "updateBloodRequest", null);
exports.BloodRequestResolver = BloodRequestResolver = __decorate([
    (0, graphql_1.Resolver)(() => blood_request_type_1.BloodRequestType),
    __metadata("design:paramtypes", [blood_request_service_1.BloodRequestService])
], BloodRequestResolver);
//# sourceMappingURL=blood-request.resolver.js.map