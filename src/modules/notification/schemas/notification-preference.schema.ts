import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type NotificationPreferenceDocument = HydratedDocument<NotificationPreference>;

@Schema({ timestamps: true })
export class NotificationPreference {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ default: true })
  emergencyAlerts: boolean;

  @Prop({ default: true })
  donationReminders: boolean;

  @Prop({ default: true })
  communityUpdates: boolean;

  @Prop({ default: true })
  emailEnabled: boolean;

  @Prop({ default: true })
  smsEnabled: boolean;

  @Prop({ default: true })
  pushEnabled: boolean;
}

export const NotificationPreferenceSchema = SchemaFactory.createForClass(NotificationPreference);
