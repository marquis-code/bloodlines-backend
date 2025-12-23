import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { BloodGroup } from "../../../common/enums/blood-group.enum"
import { Genotype } from "../../../common/enums/genotype.enum"
import { Gender } from "../../../common/enums/gender.enum"
import { UserRole } from "../../../common/enums/role.enum"

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  fullName: string

  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender

  @Prop({ required: true, unique: true })
  phoneNumber: string

  @Prop({ type: String, enum: BloodGroup, required: true })
  bloodGroup: BloodGroup

  @Prop({ type: String, enum: Genotype, sparse: true })
  genotype?: Genotype

  @Prop()
  location?: string

  @Prop()
  lastDonationDate?: Date

  @Prop({ default: false })
  emailVerified: boolean

  @Prop()
  emailVerificationToken?: string

  @Prop()
  emailVerificationExpiry?: Date

  @Prop()
  passwordResetToken?: string

  @Prop()
  passwordResetExpiry?: Date

  @Prop({ type: String, enum: UserRole, default: UserRole.DONOR })
  role: UserRole

  @Prop()
  facilityName?: string

  @Prop()
  facilityAddress?: string

  @Prop({ default: 0 })
  donationCount: number

  @Prop()
  lastUpgradeRequestDate?: Date

  @Prop({ default: true })
  agreedToDonate: boolean

  @Prop({ default: false })
  isActive: boolean

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
