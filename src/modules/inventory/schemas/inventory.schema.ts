import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BloodGroup } from "../../../common/enums/blood-group.enum";

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true, index: true })
  facilityName: string;

  @Prop({ type: String, enum: BloodGroup, required: true })
  bloodType: BloodGroup;

  @Prop({ required: true, default: 0, min: 0 })
  units: number;

  @Prop()
  lastUpdatedBy?: Types.ObjectId;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
// Compound index for facility + blood type
InventorySchema.index({ facilityName: 1, bloodType: 1 }, { unique: true });
