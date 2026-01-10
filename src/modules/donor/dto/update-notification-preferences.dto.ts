import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class UpdateNotificationPreferencesInput {
  @Field({ nullable: true })
  emergencyAlerts?: boolean

  @Field({ nullable: true })
  donationReminders?: boolean

  @Field({ nullable: true })
  communityUpdates?: boolean

  @Field({ nullable: true })
  reminderFrequency?: string
}
