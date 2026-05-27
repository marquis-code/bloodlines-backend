import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
} from "@nestjs/websockets"
import type { Server, Socket } from "socket.io"
import { Injectable } from "@nestjs/common"
import { Subject } from "rxjs"
import { filter, map } from "rxjs/operators"

export interface DonationProgressData {
  requestId: string
  [key: string]: any
}

export interface BloodRequestData {
  userId?: string
  [key: string]: any
}

@WebSocketGateway({ cors: true })
@Injectable()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private donationProgressSubject = new Subject<DonationProgressData>()
  private bloodRequestSubject = new Subject<BloodRequestData>()
  private broadcastSubject = new Subject()

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage("subscribe-donation-progress")
  subscribeDonationProgress(client: Socket, requestId: string) {
    client.join(`donation-${requestId}`)
  }

  @SubscribeMessage("subscribe-blood-requests")
  subscribeBloodRequests(client: Socket, userId: string) {
    client.join(`user-${userId}`)
  }

  @SubscribeMessage("subscribe-facility")
  subscribeFacility(client: Socket, facilityId: string) {
    client.join(`facility-${facilityId}`)
  }

  @SubscribeMessage("subscribe-request")
  subscribeRequest(client: Socket, requestId: string) {
    client.join(`request-${requestId}`)
  }

  broadcastDonationAccepted(data: DonationProgressData) {
    this.server.emit("donation-accepted", data)
    this.donationProgressSubject.next(data)
  }

  broadcastProgressUpdate(data: DonationProgressData) {
    this.server.to(`donation-${data.requestId}`).emit("progress-update", data)
    this.donationProgressSubject.next(data)
  }

  broadcastBloodRequest(data: BloodRequestData, userId?: string) {
    if (userId) {
      this.server.to(`user-${userId}`).emit("blood-request", data)
      this.bloodRequestSubject.next({ ...data, userId })
    } else {
      this.server.emit("blood-request", data)
      this.bloodRequestSubject.next(data)
    }
  }

  broadcastMessage(data: any) {
    this.server.emit("broadcast", data)
    this.broadcastSubject.next(data)
  }

  broadcastEmergencyAlert(data: any) {
    this.server.emit("emergency-alert", data)
    this.broadcastSubject.next(data)
  }

  broadcastInventoryAlert(data: any, facilityId?: string) {
    if (facilityId) {
      this.server.to(`facility-${facilityId}`).emit("inventory-alert", data)
    } else {
      this.server.emit("inventory-alert", data)
    }
  }

  broadcastAppointmentReminder(data: any, userId: string) {
    this.server.to(`user-${userId}`).emit("appointment-reminder", data)
  }

  broadcastRequestStatusUpdate(data: any, requestId: string) {
    this.server.to(`request-${requestId}`).emit("request-status-update", data)
  }

  // Filter donation progress updates by requestId
  getDonationProgressStream(requestId: string) {
    return this.donationProgressSubject.asObservable().pipe(
      filter(data => data.requestId === requestId),
      map(data => data)
    )
  }

  // Filter blood requests by userId (for nearby/relevant requests)
  getBloodRequestStream(userId: string) {
    return this.bloodRequestSubject.asObservable().pipe(
      filter(data => !data.userId || data.userId === userId),
      map(data => data)
    )
  }

  getBroadcastStream() {
    return this.broadcastSubject.asObservable()
  }
}