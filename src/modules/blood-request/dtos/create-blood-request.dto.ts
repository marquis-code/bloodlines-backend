import { IsEnum, IsNumber, IsString, Min, IsOptional } from "class-validator"
import { BloodType } from "../../../common/enums/blood-type.enum"
import { PriorityLevel } from "../../../common/enums/priority-level.enum"

export class CreateBloodRequestDto {
  @IsEnum(BloodType)
  bloodType: BloodType

  @IsEnum(PriorityLevel)
  priorityLevel: PriorityLevel

  @IsNumber()
  @Min(1)
  unitsNeeded: number

  @IsString()
  contactPhone: string

  @IsOptional()
  @IsString()
  additionalNotes?: string
}
