export declare enum FeedbackRatingEnum {
    TERRIBLE = "TERRIBLE",
    BAD = "BAD",
    OKAY = "OKAY",
    GOOD = "GOOD",
    AMAZING = "AMAZING"
}
export declare class DonationFeedback {
    id: string;
    requestId: string;
    rating: FeedbackRatingEnum;
    comments?: string;
    submittedAt: Date;
}
