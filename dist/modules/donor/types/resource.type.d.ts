export declare enum ResourceCategoryEnum {
    ALL = "ALL",
    LATEST_NEWS = "LATEST_NEWS",
    ARTICLES = "ARTICLES",
    COURSES = "COURSES",
    EXPLAINER_VIDEOS = "EXPLAINER_VIDEOS",
    RESEARCH = "RESEARCH"
}
export declare class Resource {
    id: string;
    title: string;
    description: string;
    category: ResourceCategoryEnum;
    imageUrl: string;
    duration?: string;
    actionText: string;
    actionUrl: string;
    isFeatured: boolean;
    createdAt: Date;
}
export declare class ResourcesPage {
    resources: Resource[];
    totalCount: number;
    categories: string[];
}
