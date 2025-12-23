"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUpgradeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const role_upgrade_service_1 = require("./role-upgrade.service");
const role_upgrade_resolver_1 = require("./role-upgrade.resolver");
const request_role_upgrade_schema_1 = require("./schemas/request-role-upgrade.schema");
const user_schema_1 = require("../user/schemas/user.schema");
let RoleUpgradeModule = class RoleUpgradeModule {
};
exports.RoleUpgradeModule = RoleUpgradeModule;
exports.RoleUpgradeModule = RoleUpgradeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: request_role_upgrade_schema_1.RoleUpgradeRequest.name, schema: request_role_upgrade_schema_1.RoleUpgradeRequestSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [role_upgrade_service_1.RoleUpgradeService, role_upgrade_resolver_1.RoleUpgradeResolver],
        exports: [role_upgrade_service_1.RoleUpgradeService],
    })
], RoleUpgradeModule);
//# sourceMappingURL=role-upgrade.module.js.map