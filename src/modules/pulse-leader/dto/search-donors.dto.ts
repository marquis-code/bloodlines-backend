import { InputType, Field, Float, Int } from "@nestjs/graphql"

@InputType()
export class SearchDonorsFilterDto {
  @Field({ nullable: true })
  bloodType?: string

  @Field(() => Float, { nullable: true })
  radiusKm?: number

  @Field({ nullable: true })
  availability?: string

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => Int, { nullable: true })
  limit?: number

  @Field(() => [Float], { nullable: true })
  coordinates?: [number, number]
}
