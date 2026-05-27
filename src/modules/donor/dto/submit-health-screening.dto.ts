import { IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SubmitHealthScreeningDto {
  @ApiProperty({ example: { feelingWell: true, takenAntibiotics: false } })
  @IsObject()
  answers: Record<string, boolean>;
}
