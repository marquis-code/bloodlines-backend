import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class AcceptRequestInput {
  @Field()
  requestId: string

  @Field({ nullable: true })
  latitude?: number

  @Field({ nullable: true })
  longitude?: number
}
