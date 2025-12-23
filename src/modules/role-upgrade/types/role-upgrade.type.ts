import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class RoleUpgradeRequestType {
  @Field()
  id: string

  @Field()
  userId: string

  @Field()
  requestedRole: string

  @Field()
  facilityName: string

  @Field()
  facilityAddress: string

  @Field()
  reason: string

  @Field()
  status: string

  @Field({ nullable: true })
  reviewedBy?: string

  @Field({ nullable: true })
  reviewDate?: string

  @Field({ nullable: true })
  rejectionReason?: string

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}
