import { InputType, Field } from "@nestjs/graphql"
import { FeedbackRatingEnum } from "../types/feedback.type"

@InputType()
export class SubmitFeedbackInput {
  @Field()
  requestId: string

  @Field(() => FeedbackRatingEnum)
  rating: FeedbackRatingEnum

  @Field({ nullable: true })
  comments?: string
}
