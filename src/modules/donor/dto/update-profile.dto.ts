import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  fullName?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  bloodType?: string

  @Field({ nullable: true })
  genotype?: string

  @Field({ nullable: true })
  gender?: string

  @Field({ nullable: true })
  latitude?: number

  @Field({ nullable: true })
  longitude?: number

  @Field({ nullable: true })
  availability?: string

  @Field({ nullable: true })
  emergencyContact?: string

  @Field({ nullable: true })
  emergencyContactPhone?: string
}
