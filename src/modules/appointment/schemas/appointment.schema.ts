import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type AppointmentDocument = HydratedDocument<Appointment>;

export enum AppointmentStatus {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW"
}

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  donorId: Types.ObjectId;

  @Prop({ required: true })
  facilityName: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  timeSlot: string;

  @Prop({ type: String, enum: AppointmentStatus, default: AppointmentStatus.SCHEDULED })
  status: AppointmentStatus;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
