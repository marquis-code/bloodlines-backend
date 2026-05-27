import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CampaignDocument = HydratedDocument<Campaign>;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  targetDonations: number;

  @Prop({ default: 0 })
  currentDonations: number;

  @Prop({ type: Types.ObjectId, ref: "Organization", required: true })
  organizationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId;

  @Prop({ default: "ACTIVE" }) // ACTIVE, COMPLETED, CANCELLED
  status: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
