import { ObjectType, Field, Int } from "@nestjs/graphql"

@ObjectType()
export class DonationHistory {
  @Field()
  id: string

  @Field()
  hospitalName: string

  @Field()
  bloodType: string

  @Field(() => Int)
  unitsGiven: number

  @Field()
  donatedAt: Date

  @Field()
  status: string // 'DONATED', 'DEFERRED', 'CANCELLED'

  @Field()
  facilityName: string

  @Field({ nullable: true })
  facilityAddress?: string

  @Field({ nullable: true })
  facilityPhone?: string

  @Field({ nullable: true })
  donorFeedback?: string
}
