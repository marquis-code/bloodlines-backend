import { type OnGatewayConnection, type OnGatewayDisconnect } from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";
export interface DonationProgressData {
    requestId: string;
    [key: string]: any;
}
export interface BloodRequestData {
    userId?: string;
    [key: string]: any;
}
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private donationProgressSubject;
    private bloodRequestSubject;
    private broadcastSubject;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    subscribeDonationProgress(client: Socket, requestId: string): void;
    subscribeBloodRequests(client: Socket, userId: string): void;
    subscribeFacility(client: Socket, facilityId: string): void;
    subscribeRequest(client: Socket, requestId: string): void;
    broadcastDonationAccepted(data: DonationProgressData): void;
    broadcastProgressUpdate(data: DonationProgressData): void;
    broadcastBloodRequest(data: BloodRequestData, userId?: string): void;
    broadcastMessage(data: any): void;
    broadcastEmergencyAlert(data: any): void;
    broadcastInventoryAlert(data: any, facilityId?: string): void;
    broadcastAppointmentReminder(data: any, userId: string): void;
    broadcastRequestStatusUpdate(data: any, requestId: string): void;
    getDonationProgressStream(requestId: string): import("rxjs").Observable<DonationProgressData>;
    getBloodRequestStream(userId: string): import("rxjs").Observable<BloodRequestData>;
    getBroadcastStream(): import("rxjs").Observable<unknown>;
}
