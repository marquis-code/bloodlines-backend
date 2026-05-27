import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BloodGroup } from "../../../common/enums/blood-group.enum";

export class TransferInventoryDto {
  @ApiProperty()
  @IsString()
  toFacility: string;

  @ApiProperty({ enum: BloodGroup })
  @IsEnum(BloodGroup)
  bloodType: BloodGroup;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  units: number;
}
