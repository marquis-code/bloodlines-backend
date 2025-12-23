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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_type_1 = require("./types/user.type");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async me(user) {
        return this.userService.getUserById(user.sub);
    }
    async getUser(id) {
        return this.userService.getUserById(id);
    }
    async updateProfile(user, fullName, phoneNumber, location, bloodGroup, genotype) {
        return this.userService.updateProfile(user.sub, {
            fullName,
            phoneNumber,
            location,
            bloodGroup,
            genotype,
        });
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => user_type_1.UserType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => user_type_1.UserType),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => user_type_1.UserType),
    __param(1, (0, graphql_1.Args)("fullName", { nullable: true })),
    __param(2, (0, graphql_1.Args)("phoneNumber", { nullable: true })),
    __param(3, (0, graphql_1.Args)("location", { nullable: true })),
    __param(4, (0, graphql_1.Args)("bloodGroup", { nullable: true })),
    __param(5, (0, graphql_1.Args)("genotype", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateProfile", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_type_1.UserType),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map