import { IsEnum, IsNumber, IsString, Min, IsOptional, IsDateString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { BloodGroup } from "../../../common/enums/blood-group.enum"
import { PriorityLevel } from "../../../common/enums/priority-level.enum"

export class CreateBloodRequestDto {
  @ApiProperty({ enum: BloodGroup, example: BloodGroup.A_POSITIVE })
  @IsEnum(BloodGroup)
  bloodType: BloodGroup

  @ApiProperty({ enum: PriorityLevel, example: PriorityLevel.URGENT })
  @IsEnum(PriorityLevel)
  priorityLevel: PriorityLevel

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  unitsNeeded: number

  @ApiProperty({ example: "+2348012345678" })
  @IsString()
  contactPhone: string

  @ApiPropertyOptional({ example: "Patient needs blood for surgery" })
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  additionalNotes?: string

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  patientCondition?: string

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  requiredByDate?: string
}