// import { ObjectType, Field, Int } from "@nestjs/graphql"
// import type { BloodType } from "../../../common/enums/blood-type.enum"
// import type { PriorityLevel } from "../../../common/enums/priority-level.enum"

// export enum DonationProgressStatusEnum {
//   ACCEPTED = "ACCEPTED",
//   ON_YOUR_WAY = "ON_YOUR_WAY",
//   ARRIVED_AT_HOSPITAL = "ARRIVED_AT_HOSPITAL",
//   DONATION_COMPLETE = "DONATION_COMPLETE",
//   CANCELLED = "CANCELLED",
// }

// @ObjectType()
// export class DonationProgressUpdate {
//   @Field()
//   requestId: string

//   @Field(() => DonationProgressStatusEnum)
//   status: DonationProgressStatusEnum

//   @Field()
//   timestamp: Date

//   @Field({ nullable: true })
//   location?: string

//   @Field({ nullable: true })
//   estimatedArrivalTime?: string
// }

// @ObjectType()
// export class DonationRequest {
//   @Field()
//   id: string

//   @Field()
//   bloodType: BloodType

//   @Field()
//   priority: PriorityLevel

//   @Field(() => Int)
//   unitsNeeded: number

//   @Field()
//   hospitalName: string

//   @Field()
//   address: string

//   @Field()
//   contactPhone: string

//   @Field()
//   instructions: string

//   @Field()
//   createdAt: Date

//   @Field({ nullable: true })
//   acceptedAt?: Date

//   @Field({ nullable: true })
//   rejectedAt?: Date

//   @Field(() => DonationProgressStatusEnum)
//   status: DonationProgressStatusEnum

//   @Field()
//   distance: number
// }

// @ObjectType()
// export class DonationHistory {
//   @Field()
//   id: string

//   @Field()
//   hospitalName: string

//   @Field()
//   donatedAt: Date

//   @Field()
//   bloodType: BloodType

//   @Field(() => Int)
//   unitsGiven: number

//   @Field()
//   status: string
// }


import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql"
import { BloodGroup } from "../../../common/enums/blood-group.enum"
import { PriorityLevel } from "../../../common/enums/priority-level.enum"

// Register enums for GraphQL
registerEnumType(BloodGroup, {
  name: "BloodGroup",
})

registerEnumType(PriorityLevel, {
  name: "PriorityLevel",
})

export enum DonationProgressStatusEnum {
  ACCEPTED = "ACCEPTED",
  ON_YOUR_WAY = "ON_YOUR_WAY",
  ARRIVED_AT_HOSPITAL = "ARRIVED_AT_HOSPITAL",
  DONATION_COMPLETE = "DONATION_COMPLETE",
  CANCELLED = "CANCELLED",
}

registerEnumType(DonationProgressStatusEnum, {
  name: "DonationProgressStatusEnum",
})

@ObjectType()
export class DonationProgressUpdate {
  @Field()
  requestId: string

  @Field(() => DonationProgressStatusEnum)
  status: DonationProgressStatusEnum

  @Field()
  timestamp: Date

  @Field({ nullable: true })
  location?: string

  @Field({ nullable: true })
  estimatedArrivalTime?: string
}

@ObjectType()
export class DonationRequest {
  @Field()
  id: string

  @Field(() => BloodGroup)
  bloodType: BloodGroup

  @Field(() => PriorityLevel)
  priority: PriorityLevel

  @Field(() => Int)
  unitsNeeded: number

  @Field()
  hospitalName: string

  @Field()
  address: string

  @Field()
  contactPhone: string

  @Field()
  instructions: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  acceptedAt?: Date

  @Field({ nullable: true })
  rejectedAt?: Date

  @Field(() => DonationProgressStatusEnum)
  status: DonationProgressStatusEnum

  @Field()
  distance: number
}

@ObjectType()
export class DonationHistory {
  @Field()
  id: string

  @Field()
  hospitalName: string

  @Field()
  donatedAt: Date

  @Field(() => BloodGroup)
  bloodType: BloodGroup

  @Field(() => Int)
  unitsGiven: number

  @Field()
  status: string
}