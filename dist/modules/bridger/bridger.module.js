"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bridger_controller_1 = require("./bridger.controller");
const bridger_service_1 = require("./bridger.service");
const user_schema_1 = require("../user/schemas/user.schema");
const blood_request_schema_1 = require("../blood-request/schema/blood-request.schema");
const inventory_schema_1 = require("../inventory/schemas/inventory.schema");
const appointment_schema_1 = require("../appointment/schemas/appointment.schema");
const notification_module_1 = require("../notification/notification.module");
let BridgerModule = class BridgerModule {
};
exports.BridgerModule = BridgerModule;
exports.BridgerModule = BridgerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: blood_request_schema_1.BloodRequest.name, schema: blood_request_schema_1.BloodRequestSchema },
                { name: inventory_schema_1.Inventory.name, schema: inventory_schema_1.InventorySchema },
                { name: appointment_schema_1.Appointment.name, schema: appointment_schema_1.AppointmentSchema },
            ]),
            notification_module_1.NotificationModule,
        ],
        controllers: [bridger_controller_1.BridgerController],
        providers: [bridger_service_1.BridgerService],
        exports: [bridger_service_1.BridgerService],
    })
], BridgerModule);
//# sourceMappingURL=bridger.module.js.map