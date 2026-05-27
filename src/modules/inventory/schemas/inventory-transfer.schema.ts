import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BloodGroup } from "../../../common/enums/blood-group.enum";

export type InventoryTransferDocument = HydratedDocument<InventoryTransfer>;

@Schema({ timestamps: true })
export class InventoryTransfer {
  @Prop({ required: true, index: true })
  fromFacility: string;

  @Prop({ required: true, index: true })
  toFacility: string;

  @Prop({ type: String, enum: BloodGroup, required: true })
  bloodType: BloodGroup;

  @Prop({ required: true, min: 1 })
  units: number;

  @Prop({ default: "PENDING" })
  status: string; // PENDING, COMPLETED, CANCELLED

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  requestedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User" })
  fulfilledBy?: Types.ObjectId;
}

export const InventoryTransferSchema = SchemaFactory.createForClass(InventoryTransfer);
