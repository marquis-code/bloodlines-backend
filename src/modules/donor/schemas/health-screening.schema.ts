import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type HealthScreeningDocument = HydratedDocument<HealthScreening>;

@Schema({ timestamps: true })
export class HealthScreening {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: Object, required: true })
  answers: Record<string, boolean>;

  @Prop({ required: true })
  cleared: boolean;

  @Prop()
  deferredReason?: string;

  @Prop()
  eligibleDate?: Date;

  @Prop({ default: Date.now })
  submittedAt: Date;
}

export const HealthScreeningSchema = SchemaFactory.createForClass(HealthScreening);
