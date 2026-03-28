import { ApiProperty } from "@nestjs/swagger"

export class UpdateAvailabilityInput {
  @ApiProperty({ example: "Available", description: "'Available', 'Busy', 'Unavailable'" })
  status: string
}

