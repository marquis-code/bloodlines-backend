import { InputType, Field, Float } from "@nestjs/graphql"

@InputType()
export class BroadcastMessageDto {
  @Field()
  requestId: string

  @Field()
  messageContent: string

  @Field(() => [String], { nullable: true })
  recipientDonorIds?: string[]

  @Field({ nullable: true })
  bloodType?: string

  @Field(() => [Float], { nullable: true })
  coordinates?: [number, number]

  @Field(() => Number, { nullable: true })
  radiusKm?: number

  @Field({ nullable: true })
  broadcastMethod?: string // 'SMS', 'PUSH', 'BOTH'
}
