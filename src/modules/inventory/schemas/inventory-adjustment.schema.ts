import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BloodGroup } from "../../../common/enums/blood-group.enum";

export type InventoryAdjustmentDocument = HydratedDocument<InventoryAdjustment>;

export enum AdjustmentType {
  RECEIVED = "RECEIVED",
  USED = "USED",
  WASTED = "WASTED",
  MANUAL_ADJUSTMENT = "MANUAL_ADJUSTMENT"
}

@Schema({ timestamps: true })
export class InventoryAdjustment {
  @Prop({ required: true, index: true })
  facilityName: string;

  @Prop({ type: String, enum: BloodGroup, required: true })
  bloodType: BloodGroup;

  @Prop({ type: String, enum: AdjustmentType, required: true })
  type: AdjustmentType;

  @Prop({ required: true })
  units: number;

  @Prop()
  reason?: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  adjustedBy: Types.ObjectId;
}

export const InventoryAdjustmentSchema = SchemaFactory.createForClass(InventoryAdjustment);
