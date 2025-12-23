import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class OnboardingType {
  @Field()
  userId: string

  @Field()
  currentStep: string

  @Field()
  isCompleted: boolean

  @Field({ nullable: true })
  completedAt?: string
}
