import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class RejectRequestInput {
  @Field()
  requestId: string

  @Field({ nullable: true })
  reason?: string
}
