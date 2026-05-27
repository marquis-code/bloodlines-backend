import { IsArray, IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BloodGroup } from "../../../common/enums/blood-group.enum";

export class EmergencyAlertDto {
  @ApiProperty({ type: [String], enum: BloodGroup })
  @IsArray()
  @IsEnum(BloodGroup, { each: true })
  targetBloodGroups: BloodGroup[];

  @ApiProperty()
  @IsString()
  message: string;
}
