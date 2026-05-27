import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  headquarters: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  leaderId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: "User" }])
  bridgerIds: Types.ObjectId[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
