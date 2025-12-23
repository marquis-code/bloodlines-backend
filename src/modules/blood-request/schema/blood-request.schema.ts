import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { Types } from "mongoose"
import { BloodType } from "../../../common/enums/blood-type.enum"
import { PriorityLevel } from "../../../common/enums/priority-level.enum"
import { RequestStatus } from "../../../common/enums/request-status.enum"
import { DonorResponse } from "../../../common/enums/donor-response.enum"

export type BloodRequestDocument = HydratedDocument<BloodRequest>

@Schema({ timestamps: true })
export class BloodRequest {
  @Prop({ type: String, enum: BloodType, required: true })
  bloodType: BloodType

  @Prop({ type: String, enum: PriorityLevel, required: true })
  priorityLevel: PriorityLevel

  @Prop({ required: true, min: 1 })
  unitsNeeded: number

  @Prop({ required: true })
  contactPhone: string

  @Prop()
  additionalNotes?: string

  @Prop({ type: String, enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId

  @Prop([{ type: Types.ObjectId, ref: "User" }])
  assignedDonors?: Types.ObjectId[]

  @Prop({ type: String, enum: DonorResponse, default: DonorResponse.NO_RESPONSE })
  donorResponseStatus: DonorResponse

  @Prop()
  fulfillmentDate?: Date

  @Prop({ default: 0 })
  unitsConfirmed: number

  @Prop({ default: 0 })
  unitsEscalated: number

  @Prop({ default: 0 })
  unitsNoResponse: number

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const BloodRequestSchema = SchemaFactory.createForClass(BloodRequest)
