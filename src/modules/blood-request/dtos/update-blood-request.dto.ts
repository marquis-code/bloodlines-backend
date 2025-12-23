import { IsOptional, IsEnum, IsNumber, IsString, Min } from "class-validator"
import { InputType, Field } from "@nestjs/graphql"
import { PriorityLevel } from "../../../common/enums/priority-level.enum"
import { RequestStatus } from "../../../common/enums/request-status.enum"

@InputType()
export class UpdateBloodRequestDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PriorityLevel)
  priorityLevel?: PriorityLevel

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  unitsNeeded?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactPhone?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  additionalNotes?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus
}