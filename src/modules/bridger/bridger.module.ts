import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BridgerController } from "./bridger.controller";
import { BridgerService } from "./bridger.service";
import { User, UserSchema } from "../user/schemas/user.schema";
import { BloodRequest, BloodRequestSchema } from "../blood-request/schema/blood-request.schema";
import { Inventory, InventorySchema } from "../inventory/schemas/inventory.schema";
import { Appointment, AppointmentSchema } from "../appointment/schemas/appointment.schema";
import { NotificationModule } from "../notification/notification.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BloodRequest.name, schema: BloodRequestSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    NotificationModule,
  ],
  controllers: [BridgerController],
  providers: [BridgerService],
  exports: [BridgerService],
})
export class BridgerModule {}
