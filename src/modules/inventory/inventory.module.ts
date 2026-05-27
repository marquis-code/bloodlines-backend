import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";
import { Inventory, InventorySchema } from "./schemas/inventory.schema";
import { InventoryAdjustment, InventoryAdjustmentSchema } from "./schemas/inventory-adjustment.schema";
import { InventoryTransfer, InventoryTransferSchema } from "./schemas/inventory-transfer.schema";
import { User, UserSchema } from "../user/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
      { name: InventoryAdjustment.name, schema: InventoryAdjustmentSchema },
      { name: InventoryTransfer.name, schema: InventoryTransferSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
