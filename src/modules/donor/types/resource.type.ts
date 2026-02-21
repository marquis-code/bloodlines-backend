import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export enum ResourceCategoryEnum {
  ALL = "ALL",
  LATEST_NEWS = "LATEST_NEWS",
  ARTICLES = "ARTICLES",
  COURSES = "COURSES",
  EXPLAINER_VIDEOS = "EXPLAINER_VIDEOS",
  RESEARCH = "RESEARCH",
}

export class Resource {
  @ApiProperty({ example: "res_123" })
  id: string

  @ApiProperty({ example: "How to prepare for your first donation" })
  title: string

  @ApiProperty({ example: "A comprehensive guide for new donors." })
  description: string

  @ApiProperty({ enum: ResourceCategoryEnum, example: ResourceCategoryEnum.ARTICLES })
  category: ResourceCategoryEnum

  @ApiProperty({ example: "https://example.com/image.jpg" })
  imageUrl: string

  @ApiPropertyOptional({ example: "5 mins" })
  duration?: string

  @ApiProperty({ example: "Read More" })
  actionText: string

  @ApiProperty({ example: "https://example.com/article" })
  actionUrl: string

  @ApiProperty({ example: true })
  isFeatured: boolean

  @ApiProperty({ example: "2024-02-21T10:00:00Z" })
  createdAt: Date
}

export class ResourcesPage {
  @ApiProperty({ type: [Resource] })
  resources: Resource[]

  @ApiProperty({ example: 45 })
  totalCount: number

  @ApiProperty({ type: [String], example: ["LATEST_NEWS", "ARTICLES"] })
  categories: string[]
}