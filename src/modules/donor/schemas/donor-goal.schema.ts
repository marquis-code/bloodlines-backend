import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DonorGoalDocument = HydratedDocument<DonorGoal>;

@Schema({ timestamps: true })
export class DonorGoal {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  target: number;

  @Prop({ default: 0 })
  current: number;

  @Prop({ required: true })
  year: number;
}

export const DonorGoalSchema = SchemaFactory.createForClass(DonorGoal);
