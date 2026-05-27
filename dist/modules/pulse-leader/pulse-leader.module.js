"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulseLeaderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pulse_leader_service_1 = require("./pulse-leader.service");
const pulse_leader_controller_1 = require("./pulse-leader.controller");
const blood_request_schema_1 = require("../blood-request/schema/blood-request.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const organization_schema_1 = require("./schemas/organization.schema");
const campaign_schema_1 = require("./schemas/campaign.schema");
const inventory_schema_1 = require("../inventory/schemas/inventory.schema");
const analytics_schema_1 = require("./schemas/analytics.schema");
const notification_module_1 = require("../notification/notification.module");
let PulseLeaderModule = class PulseLeaderModule {
};
exports.PulseLeaderModule = PulseLeaderModule;
exports.PulseLeaderModule = PulseLeaderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: blood_request_schema_1.BloodRequest.name, schema: blood_request_schema_1.BloodRequestSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: organization_schema_1.Organization.name, schema: organization_schema_1.OrganizationSchema },
                { name: campaign_schema_1.Campaign.name, schema: campaign_schema_1.CampaignSchema },
                { name: inventory_schema_1.Inventory.name, schema: inventory_schema_1.InventorySchema },
                { name: analytics_schema_1.OrganizationAnalytics.name, schema: analytics_schema_1.OrganizationAnalyticsSchema },
            ]),
            notification_module_1.NotificationModule,
        ],
        providers: [pulse_leader_service_1.PulseLeaderService],
        controllers: [pulse_leader_controller_1.PulseLeaderController],
        exports: [pulse_leader_service_1.PulseLeaderService],
    })
], PulseLeaderModule);
//# sourceMappingURL=pulse-leader.module.js.map