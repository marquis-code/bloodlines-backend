import { IsString, IsDateString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCampaignDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  targetDonations: number;
}
