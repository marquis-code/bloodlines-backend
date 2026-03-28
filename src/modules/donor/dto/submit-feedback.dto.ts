import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { FeedbackRatingEnum } from "../types/feedback.type"

export class SubmitFeedbackInput {
  @ApiProperty({ example: "req_123" })
  requestId: string

  @ApiProperty({ enum: FeedbackRatingEnum, example: FeedbackRatingEnum.AMAZING })
  rating: FeedbackRatingEnum

  @ApiPropertyOptional({ example: "Great experience!" })
  comments?: string
}

