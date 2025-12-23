import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import type { HydratedDocument } from "mongoose"
import { Types } from "mongoose"
import { UserRole } from "../../../common/enums/role.enum"

export type RoleUpgradeRequestDocument = HydratedDocument<RoleUpgradeRequest>

@Schema({ timestamps: true })
export class RoleUpgradeRequest {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId

  @Prop({ type: String, enum: UserRole, required: true })
  requestedRole: UserRole

  @Prop({ required: true })
  facilityName: string

  @Prop({ required: true })
  facilityAddress: string

  @Prop({ required: true })
  reason: string

  @Prop({ default: "PENDING" })
  status: string // PENDING, APPROVED, REJECTED

  @Prop()
  reviewedBy?: Types.ObjectId

  @Prop()
  reviewDate?: Date

  @Prop()
  rejectionReason?: string

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const RoleUpgradeRequestSchema = SchemaFactory.createForClass(RoleUpgradeRequest)
