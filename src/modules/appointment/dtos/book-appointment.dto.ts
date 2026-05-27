import { IsDateString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BookAppointmentDto {
  @ApiProperty()
  @IsString()
  facilityName: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  timeSlot: string;
}
