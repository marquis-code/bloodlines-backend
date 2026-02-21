import { ApiPropertyOptional } from "@nestjs/swagger"

export class SearchDonorsFilterDto {
  @ApiPropertyOptional({ example: "A+" })
  bloodType?: string

  @ApiPropertyOptional({ example: 50 })
  radiusKm?: number

  @ApiPropertyOptional({ example: "AVAILABLE" })
  availability?: string

  @ApiPropertyOptional({ example: 0 })
  skip?: number

  @ApiPropertyOptional({ example: 10 })
  limit?: number

  @ApiPropertyOptional({ example: [6.5244, 3.3792] })
  coordinates?: [number, number]
}

