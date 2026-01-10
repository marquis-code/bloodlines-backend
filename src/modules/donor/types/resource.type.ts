import { ObjectType, Field } from "@nestjs/graphql"

export enum ResourceCategoryEnum {
  ALL = "ALL",
  LATEST_NEWS = "LATEST_NEWS",
  ARTICLES = "ARTICLES",
  COURSES = "COURSES",
  EXPLAINER_VIDEOS = "EXPLAINER_VIDEOS",
  RESEARCH = "RESEARCH",
}

@ObjectType()
export class Resource {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  category: ResourceCategoryEnum

  @Field()
  imageUrl: string

  @Field()
  duration?: string

  @Field()
  actionText: string

  @Field()
  actionUrl: string

  @Field()
  isFeatured: boolean

  @Field()
  createdAt: Date
}

@ObjectType()
export class ResourcesPage {
  @Field(() => [Resource])
  resources: Resource[]

  @Field()
  totalCount: number

  @Field(() => [String])
  categories: string[]
}
