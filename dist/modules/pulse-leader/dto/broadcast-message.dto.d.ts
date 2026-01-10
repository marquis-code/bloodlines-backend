export declare class BroadcastMessageDto {
    requestId: string;
    messageContent: string;
    recipientDonorIds?: string[];
    bloodType?: string;
    coordinates?: [number, number];
    radiusKm?: number;
    broadcastMethod?: string;
}
