import { IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SetGoalDto {
  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(1)
  target: number;

  @ApiProperty({ example: 2024 })
  @IsNumber()
  @Min(2020)
  year: number;
}
