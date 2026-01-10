import { FeedbackRatingEnum } from "../types/feedback.type";
export declare class SubmitFeedbackInput {
    requestId: string;
    rating: FeedbackRatingEnum;
    comments?: string;
}
