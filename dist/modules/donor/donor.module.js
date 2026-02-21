"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const donor_service_1 = require("./donor.service");
const donor_controller_1 = require("./donor.controller");
const user_schema_1 = require("../user/schemas/user.schema");
const blood_request_schema_1 = require("../blood-request/schema/blood-request.schema");
const notification_module_1 = require("../notification/notification.module");
let DonorModule = class DonorModule {
};
exports.DonorModule = DonorModule;
exports.DonorModule = DonorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: blood_request_schema_1.BloodRequest.name, schema: blood_request_schema_1.BloodRequestSchema },
            ]),
            notification_module_1.NotificationModule,
        ],
        providers: [donor_service_1.DonorService],
        controllers: [donor_controller_1.DonorController],
        exports: [donor_service_1.DonorService],
    })
], DonorModule);
//# sourceMappingURL=donor.module.js.map