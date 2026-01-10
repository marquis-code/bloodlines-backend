import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class UpdateAvailabilityInput {
  @Field()
  status: string // 'Available', 'Busy', 'Unavailable'
}
