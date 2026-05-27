import { IsEnum, IsNumber, IsString, IsOptional, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BloodGroup } from "../../../common/enums/blood-group.enum";
import { AdjustmentType } from "../schemas/inventory-adjustment.schema";

export class AdjustInventoryDto {
  @ApiProperty({ enum: BloodGroup })
  @IsEnum(BloodGroup)
  bloodType: BloodGroup;

  @ApiProperty({ enum: AdjustmentType })
  @IsEnum(AdjustmentType)
  type: AdjustmentType;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  units: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  reason?: string;
}
