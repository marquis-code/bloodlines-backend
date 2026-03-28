import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export enum FeedbackRatingEnum {
  TERRIBLE = "TERRIBLE",
  BAD = "BAD",
  OKAY = "OKAY",
  GOOD = "GOOD",
  AMAZING = "AMAZING",
}

export class DonationFeedback {
  @ApiProperty({ example: "fb_123" })
  id: string

  @ApiProperty({ example: "req_123" })
  requestId: string

  @ApiProperty({ enum: FeedbackRatingEnum, example: FeedbackRatingEnum.GOOD })
  rating: FeedbackRatingEnum

  @ApiPropertyOptional({ example: "Great donor, very patient." })
  comments?: string

  @ApiProperty({ example: "2024-02-21T10:00:00Z" })
  submittedAt: Date
}