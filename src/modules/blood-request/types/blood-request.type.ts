import { ObjectType, Field, Int } from "@nestjs/graphql"

@ObjectType()
export class BloodRequestType {
  @Field()
  id: string

  @Field()
  bloodType: string

  @Field()
  priorityLevel: string

  @Field(() => Int)
  unitsNeeded: number

  @Field()
  contactPhone: string

  @Field({ nullable: true })
  additionalNotes?: string

  @Field()
  status: string

  @Field()
  createdBy: string

  @Field(() => [String], { nullable: true })
  assignedDonors?: string[]

  @Field()
  donorResponseStatus: string

  @Field({ nullable: true })
  fulfillmentDate?: string

  @Field(() => Int)
  unitsConfirmed: number

  @Field(() => Int)
  unitsEscalated: number

  @Field(() => Int)
  unitsNoResponse: number

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}
