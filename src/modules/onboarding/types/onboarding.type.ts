import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class OnboardingType {
  @ApiProperty({ example: "user_123" })
  userId: string

  @ApiProperty({ example: "STEP_1" })
  currentStep: string

  @ApiProperty({ example: false })
  isCompleted: boolean

  @ApiPropertyOptional({ example: "2024-02-21T10:00:00Z" })
  completedAt?: string
}

