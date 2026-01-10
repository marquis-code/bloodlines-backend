// import { ObjectType, Field } from "@nestjs/graphql"

// export enum FeedbackRatingEnum {
//   TERRIBLE = "TERRIBLE",
//   BAD = "BAD",
//   OKAY = "OKAY",
//   GOOD = "GOOD",
//   AMAZING = "AMAZING",
// }

// @ObjectType()
// export class DonationFeedback {
//   @Field()
//   id: string

//   @Field()
//   requestId: string

//   @Field(() => FeedbackRatingEnum)
//   rating: FeedbackRatingEnum

//   @Field({ nullable: true })
//   comments?: string

//   @Field()
//   submittedAt: Date
// }


import { ObjectType, Field, registerEnumType } from "@nestjs/graphql"

export enum FeedbackRatingEnum {
  TERRIBLE = "TERRIBLE",
  BAD = "BAD",
  OKAY = "OKAY",
  GOOD = "GOOD",
  AMAZING = "AMAZING",
}

// Register enum for GraphQL
registerEnumType(FeedbackRatingEnum, {
  name: "FeedbackRatingEnum",
  description: "Rating options for donation feedback",
})

@ObjectType()
export class DonationFeedback {
  @Field()
  id: string

  @Field()
  requestId: string

  @Field(() => FeedbackRatingEnum)
  rating: FeedbackRatingEnum

  @Field({ nullable: true })
  comments?: string

  @Field()
  submittedAt: Date
}