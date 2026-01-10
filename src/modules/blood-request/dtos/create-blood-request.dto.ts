import { IsEnum, IsNumber, IsString, Min, IsOptional } from "class-validator"
import { InputType, Field } from "@nestjs/graphql"
import { BloodGroup } from "../../../common/enums/blood-group.enum" 
import { PriorityLevel } from "../../../common/enums/priority-level.enum"

@InputType()
export class CreateBloodRequestDto {
  @Field(() => String)
  @IsEnum(BloodGroup)
  bloodType: BloodGroup

  @Field(() => String)
  @IsEnum(PriorityLevel)
  priorityLevel: PriorityLevel

  @Field(() => Number)
  @IsNumber()
  @Min(1)
  unitsNeeded: number

  @Field()
  @IsString()
  contactPhone: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  additionalNotes?: string
}