import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { BloodRequest } from "./schema/blood-request.schema";
import { BloodRequestWithCreatedBy } from "./interfaces/blood-request-populated.interface";
export declare class BloodRequestGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private userModel;
    private bloodRequestModel;
    server: Server;
    private connectedUsers;
    constructor(jwtService: JwtService, userModel: Model<User>, bloodRequestModel: Model<BloodRequest>);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleLocationUpdate(data: {
        lat: number;
        lng: number;
    }, client: Socket): Promise<{
        success: boolean;
        message: string;
    }>;
    handleAvailabilityUpdate(data: {
        isAvailable: boolean;
    }, client: Socket): Promise<{
        success: boolean;
        message: string;
    }>;
    notifyNearbyDonors(bloodRequest: BloodRequestWithCreatedBy, bridgerLocation: {
        lat: number;
        lng: number;
    }): Promise<void>;
    notifyDonorAcceptance(requestId: string, donorId: string): Promise<void>;
    notifyRequestFulfilled(requestId: string): Promise<void>;
    notifyDonorArrival(requestId: string, donorId: string): Promise<void>;
    broadcastRequestUpdate(requestId: string): Promise<void>;
    private getSocketIdByUserId;
    private findNearbyDonors;
    private calculateDistance;
    private deg2rad;
}
