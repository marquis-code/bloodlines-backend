import { InputType, Field } from "@nestjs/graphql"
import { DonationProgressStatusEnum } from "../types/donation-request.type"

@InputType()
export class UpdateProgressInput {
  @Field()
  requestId: string

  @Field(() => DonationProgressStatusEnum)
  status: DonationProgressStatusEnum

  @Field({ nullable: true })
  location?: string

  @Field({ nullable: true })
  estimatedArrivalTime?: string
}
