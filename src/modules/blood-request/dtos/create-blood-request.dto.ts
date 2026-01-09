import { IsEnum, IsNumber, IsString, Min, IsOptional } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { BloodType } from "../../../common/enums/blood-type.enum";
import { PriorityLevel } from "../../../common/enums/priority-level.enum";

@InputType()
export class CreateBloodRequestDto {
  @Field(() => BloodType)
  @IsEnum(BloodType)
  bloodType: BloodType;

  @Field(() => PriorityLevel)
  @IsEnum(PriorityLevel)
  priorityLevel: PriorityLevel;

  @Field(() => Number)
  @IsNumber()
  @Min(1)
  unitsNeeded: number;

  @Field()
  @IsString()
  contactPhone: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  additionalNotes?: string;
}
