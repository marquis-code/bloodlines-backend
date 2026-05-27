import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type OrganizationAnalyticsDocument = HydratedDocument<OrganizationAnalytics>;

@Schema({ timestamps: true })
export class OrganizationAnalytics {
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 0 })
  totalDonors: number;

  @Prop({ default: 0 })
  activeDonors: number;

  @Prop({ default: 0 })
  totalBloodRequests: number;

  @Prop({ default: 0 })
  fulfilledBloodRequests: number;

  @Prop({ default: 0 })
  escalatedRequests: number;

  @Prop({ default: 0 })
  emergenciesHandled: number;
}

export const OrganizationAnalyticsSchema = SchemaFactory.createForClass(OrganizationAnalytics);
