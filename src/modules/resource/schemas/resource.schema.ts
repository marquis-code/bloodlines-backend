import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import type { HydratedDocument } from "mongoose"

export type ResourceDocument = HydratedDocument<Resource>

@Schema({ timestamps: true })
export class Resource {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop()
  content: string

  @Prop()
  imageUrl: string

  @Prop({
    required: true,
    enum: ["ARTICLE", "COURSE", "VIDEO", "RESEARCH"],
  })
  type: string

  @Prop({
    required: true,
    enum: ["BLOOD_101", "DONATION_PROCESS", "POST_CARE", "HEALTH_TIPS", "EMERGENCY"],
  })
  category: string

  @Prop()
  duration: string

  @Prop({ default: 0 })
  viewCount: number

  @Prop({ default: true })
  isPublished: boolean

  @Prop()
  publishedAt: Date
}

export const ResourceSchema = SchemaFactory.createForClass(Resource)
