import { ApiPropertyOptional } from "@nestjs/swagger"

export class UpdateNotificationPreferencesInput {
  @ApiPropertyOptional({ example: true })
  emergencyAlerts?: boolean

  @ApiPropertyOptional({ example: true })
  donationReminders?: boolean

  @ApiPropertyOptional({ example: false })
  communityUpdates?: boolean

  @ApiPropertyOptional({ example: "daily" })
  reminderFrequency?: string
}

