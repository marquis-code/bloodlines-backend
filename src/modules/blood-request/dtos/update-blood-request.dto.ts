import { IsOptional, IsEnum, IsNumber, IsString, Min } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { PriorityLevel } from "../../../common/enums/priority-level.enum"
import { RequestStatus } from "../../../common/enums/request-status.enum"

export class UpdateBloodRequestDto {
  @ApiPropertyOptional({ enum: PriorityLevel, example: PriorityLevel.URGENT })
  @IsOptional()
  @IsEnum(PriorityLevel)
  priorityLevel?: PriorityLevel

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  unitsNeeded?: number

  @ApiPropertyOptional({ example: "+2348012345678" })
  @IsOptional()
  @IsString()
  contactPhone?: string

  @ApiPropertyOptional({ example: "Updated patient notes" })
  @IsOptional()
  @IsString()
  additionalNotes?: string

  @ApiPropertyOptional({ enum: RequestStatus, example: RequestStatus.PENDING })
  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus
}