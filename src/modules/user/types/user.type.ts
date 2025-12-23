import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class UserType {
  @Field()
  id: string

  @Field()
  email: string

  @Field()
  fullName: string

  @Field()
  gender: string

  @Field()
  phoneNumber: string

  @Field()
  bloodGroup: string

  @Field({ nullable: true })
  genotype?: string

  @Field({ nullable: true })
  location?: string

  @Field({ nullable: true })
  lastDonationDate?: string

  @Field()
  emailVerified: boolean

  @Field()
  role: string

  @Field({ nullable: true })
  facilityName?: string

  @Field({ nullable: true })
  facilityAddress?: string

  @Field()
  donationCount: number

  @Field()
  agreedToDonate: boolean

  @Field()
  isActive: boolean

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}
