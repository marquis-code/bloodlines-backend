// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
// import { HydratedDocument } from "mongoose"
// import { BloodGroup } from "../../../common/enums/blood-group.enum"
// import { Genotype } from "../../../common/enums/genotype.enum"
// import { Gender } from "../../../common/enums/gender.enum"
// import { UserRole } from "../../../common/enums/role.enum"

// export type UserDocument = HydratedDocument<User>

// @Schema({ timestamps: true })
// export class User {
//   @Prop({ required: true, unique: true })
//   email: string

//   @Prop({ required: true })
//   password: string

//   @Prop({ required: true })
//   fullName: string

//   @Prop({ type: String, enum: Gender, required: true })
//   gender: Gender

//   @Prop({ required: true, unique: true })
//   phoneNumber: string

//   @Prop({ type: String, enum: BloodGroup, required: true })
//   bloodGroup: BloodGroup

//   @Prop({ type: String, enum: Genotype, sparse: true })
//   genotype?: Genotype

//   @Prop()
//   location?: string

//   @Prop()
//   lastDonationDate?: Date

//   @Prop({ default: false })
//   emailVerified: boolean

//   @Prop()
//   emailVerificationToken?: string

//   @Prop()
//   emailVerificationExpiry?: Date

//   @Prop()
//   passwordResetToken?: string

//   @Prop()
//   passwordResetExpiry?: Date

//   @Prop({ type: String, enum: UserRole, default: UserRole.DONOR })
//   role: UserRole

//   @Prop()
//   facilityName?: string

//   @Prop()
//   facilityAddress?: string

//   @Prop({ default: 0 })
//   donationCount: number

//   @Prop()
//   lastUpgradeRequestDate?: Date

//   @Prop({ default: true })
//   agreedToDonate: boolean

//   @Prop({ default: false })
//   isActive: boolean

//   @Prop()
//   createdAt?: Date

//   @Prop()
//   updatedAt?: Date
// }

// export const UserSchema = SchemaFactory.createForClass(User)


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

  @Prop({ type: String, enum: BloodGroup })
  bloodGroup?: BloodGroup

  @Prop({ type: String, enum: Genotype, sparse: true })
  genotype?: Genotype

  // UPDATED: Location field now supports both string and GeoJSON for real-time matching
  @Prop({
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
  })
  geoLocation?: {
    type: string
    coordinates: number[]
  }

  @Prop()
  location?: string // Keep original string location for address display

  @Prop()
  address?: string

  @Prop()
  city?: string

  @Prop()
  state?: string

  @Prop()
  country?: string

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

  @Prop()
  refreshToken?: string

  @Prop({ type: String, enum: UserRole, default: UserRole.DONOR })
  role: UserRole

  @Prop({ default: false })
  anonymous?: boolean

  // Bridger-specific fields
  @Prop()
  facilityName?: string

  @Prop()
  facilityAddress?: string

  @Prop()
  licenseNumber?: string

  // Donor-specific fields
  @Prop({ default: 0 })
  donationCount: number

  @Prop()
  lastUpgradeRequestDate?: Date

  @Prop({ default: true })
  agreedToDonate: boolean

  // NEW: Real-time availability tracking for donors
  @Prop({ default: false })
  isAvailable?: boolean

  @Prop()
  nextEligibleDate?: Date

  @Prop({ default: 0 })
  totalDonations?: number

  @Prop()
  emergencyContact?: string

  @Prop()
  emergencyContactPhone?: string

  // NEW: Notification preferences
  @Prop({ default: true })
  emailNotifications?: boolean

  @Prop({ default: true })
  smsNotifications?: boolean

  @Prop({ default: true })
  pushNotifications?: boolean

  // NEW: Profile completion tracking
  @Prop({ default: false })
  profileComplete?: boolean

  @Prop({ default: false })
  isActive: boolean

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)

// Create 2dsphere index for location-based queries (CRITICAL for real-time matching)
UserSchema.index({ geoLocation: "2dsphere" })

// Create compound index for efficient donor queries
UserSchema.index({ role: 1, bloodGroup: 1, isAvailable: 1 })

// Index for email lookup
UserSchema.index({ email: 1 })

// Index for phone number lookup
UserSchema.index({ phoneNumber: 1 })