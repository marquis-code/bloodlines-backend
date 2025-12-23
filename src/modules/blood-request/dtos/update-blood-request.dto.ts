import { IsOptional, IsEnum, IsNumber, IsString, Min } from "class-validator"
import { PriorityLevel } from "../../../common/enums/priority-level.enum"
import { RequestStatus } from "../../../common/enums/request-status.enum"

export class UpdateBloodRequestDto {
  @IsOptional()
  @IsEnum(PriorityLevel)
  priorityLevel?: PriorityLevel

  @IsOptional()
  @IsNumber()
  @Min(1)
  unitsNeeded?: number

  @IsOptional()
  @IsString()
  contactPhone?: string

  @IsOptional()
  @IsString()
  additionalNotes?: string

  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus
}
