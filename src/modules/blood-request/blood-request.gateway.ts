import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/mongoose"
import { Model, HydratedDocument } from "mongoose"
import { User } from "../user/schemas/user.schema"
import { BloodRequest } from "./schema/blood-request.schema"
import { UserRole } from "../../common/enums/role.enum"
import { RequestStatus } from "../../common/enums/request-status.enum"
import { BloodRequestWithCreatedBy, BloodRequestFullyPopulated } from "./interfaces/blood-request-populated.interface"

interface ConnectedUser {
  userId: string
  socketId: string
  role: UserRole
  location?: { lat: number; lng: number }
  bloodGroup?: string
  isAvailable?: boolean
}

@WebSocketGateway({
  cors: {
    origin: "*",
    credentials: true,
  },
  namespace: "/blood-requests",
})
@Injectable()
export class BloodRequestGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private connectedUsers: Map<string, ConnectedUser> = new Map()

  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(BloodRequest.name) private bloodRequestModel: Model<BloodRequest>,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(" ")[1]

      if (!token) {
        client.disconnect()
        return
      }

      const payload = this.jwtService.verify(token)
      const user = await this.userModel.findById(payload.sub)

      if (!user) {
        client.disconnect()
        return
      }

      this.connectedUsers.set(client.id, {
        userId: user._id.toString(),
        socketId: client.id,
        role: user.role,
        bloodGroup: user.bloodGroup,
        isAvailable: user.role === UserRole.DONOR ? user.isAvailable : undefined,
      })

      // Join user-specific room
      client.join(`user:${user._id}`)

      // If donor, join donor rooms
      if (user.role === UserRole.DONOR && user.isAvailable) {
        client.join("available-donors")
        client.join(`blood-group:${user.bloodGroup}`)
      }

      // If bridger, join bridger room
      if (user.role === UserRole.BRIDGER) {
        client.join("bridgers")
      }

      console.log(`User ${user.email} connected with socket ${client.id}`)
      
      // Notify user of connection
      client.emit("connected", {
        message: "Successfully connected to blood request system",
        userId: user._id,
      })
    } catch (error) {
      console.error("Connection error:", error)
      client.disconnect()
    }
  }

  handleDisconnect(client: Socket) {
    const user = this.connectedUsers.get(client.id)
    if (user) {
      console.log(`User ${user.userId} disconnected`)
      this.connectedUsers.delete(client.id)
    }
  }

  @SubscribeMessage("updateLocation")
  async handleLocationUpdate(
    @MessageBody() data: { lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id)
    if (user) {
      user.location = data
      
      // Update user location in database with GeoJSON format
      await this.userModel.findByIdAndUpdate(user.userId, {
        geoLocation: {
          type: "Point",
          coordinates: [data.lng, data.lat], // [longitude, latitude]
        },
      })

      return { success: true, message: "Location updated" }
    }
    return { success: false, message: "User not found" }
  }

  @SubscribeMessage("updateAvailability")
  async handleAvailabilityUpdate(
    @MessageBody() data: { isAvailable: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id)
    if (user && user.role === UserRole.DONOR) {
      user.isAvailable = data.isAvailable

      await this.userModel.findByIdAndUpdate(user.userId, {
        isAvailable: data.isAvailable,
      })

      if (data.isAvailable) {
        client.join("available-donors")
        client.join(`blood-group:${user.bloodGroup}`)
      } else {
        client.leave("available-donors")
        client.leave(`blood-group:${user.bloodGroup}`)
      }

      return { success: true, message: "Availability updated" }
    }
    return { success: false, message: "Invalid user or role" }
  }

  // Emit new blood request to nearby donors
  async notifyNearbyDonors(bloodRequest: BloodRequestWithCreatedBy, bridgerLocation: { lat: number; lng: number }) {
    const nearbyDonors = await this.findNearbyDonors(
      bloodRequest.bloodType,
      bridgerLocation,
      50, // 50km radius
    )

    nearbyDonors.forEach(donor => {
      const socketId = this.getSocketIdByUserId(donor._id.toString())
      if (socketId) {
        this.server.to(socketId).emit("newBloodRequest", {
          requestId: bloodRequest._id,
          bloodType: bloodRequest.bloodType,
          priorityLevel: bloodRequest.priorityLevel,
          unitsNeeded: bloodRequest.unitsNeeded,
          contactPhone: bloodRequest.contactPhone,
          additionalNotes: bloodRequest.additionalNotes,
          distance: this.calculateDistance(bridgerLocation, donor.geoLocation),
          createdBy: {
            fullName: bloodRequest.createdBy.fullName,
            facilityName: bloodRequest.createdBy.facilityName,
          },
          createdAt: bloodRequest.createdAt,
        })
      }
    })

    // Also broadcast to all available donors of matching blood group
    this.server.to(`blood-group:${bloodRequest.bloodType}`).emit("newBloodRequest", {
      requestId: bloodRequest._id,
      bloodType: bloodRequest.bloodType,
      priorityLevel: bloodRequest.priorityLevel,
      unitsNeeded: bloodRequest.unitsNeeded,
      contactPhone: bloodRequest.contactPhone,
      additionalNotes: bloodRequest.additionalNotes,
      createdBy: {
        fullName: bloodRequest.createdBy.fullName,
        facilityName: bloodRequest.createdBy.facilityName,
      },
      createdAt: bloodRequest.createdAt,
    })
  }

  // Notify bridger when donor accepts
  async notifyDonorAcceptance(requestId: string, donorId: string) {
    const request = await this.bloodRequestModel
      .findById(requestId)
      .populate<{ createdBy: HydratedDocument<User> }>("createdBy")
    const donor = await this.userModel.findById(donorId)

    if (!request || !donor) return

    const createdBy = request.createdBy

    // Notify the bridger who created the request
    this.server.to(`user:${createdBy._id}`).emit("donorAccepted", {
      requestId: request._id,
      donor: {
        id: donor._id,
        fullName: donor.fullName,
        bloodGroup: donor.bloodGroup,
        phoneNumber: donor.phoneNumber,
      },
      unitsConfirmed: request.unitsConfirmed,
      unitsNeeded: request.unitsNeeded,
      timestamp: new Date(),
    })

    // Notify the donor
    this.server.to(`user:${donorId}`).emit("acceptanceConfirmed", {
      requestId: request._id,
      message: "Your acceptance has been confirmed",
      bridger: {
        fullName: createdBy.fullName,
        facilityName: createdBy.facilityName,
        contactPhone: request.contactPhone,
      },
      timestamp: new Date(),
    })
  }

  // Notify when request is fulfilled
  async notifyRequestFulfilled(requestId: string) {
    const request = await this.bloodRequestModel
      .findById(requestId)
      .populate<{ 
        createdBy: HydratedDocument<User>
        assignedDonors: HydratedDocument<User>[]
      }>("createdBy")
      .populate("assignedDonors")

    if (!request) return

    const createdBy = request.createdBy

    // Notify bridger
    this.server.to(`user:${createdBy._id}`).emit("requestFulfilled", {
      requestId: request._id,
      message: "Blood request has been fulfilled",
      unitsConfirmed: request.unitsConfirmed,
      unitsNeeded: request.unitsNeeded,
      fulfillmentDate: request.fulfillmentDate,
    })

    // Notify all assigned donors
    if (request.assignedDonors) {
      request.assignedDonors.forEach((donor) => {
        this.server.to(`user:${donor._id}`).emit("requestFulfilled", {
          requestId: request._id,
          message: "The blood request you responded to has been fulfilled",
          timestamp: new Date(),
        })
      })
    }
  }

  // Notify when donor arrives at hospital
  async notifyDonorArrival(requestId: string, donorId: string) {
    const request = await this.bloodRequestModel
      .findById(requestId)
      .populate<{ createdBy: HydratedDocument<User> }>("createdBy")
    const donor = await this.userModel.findById(donorId)

    if (!request || !donor) return

    const createdBy = request.createdBy

    this.server.to(`user:${createdBy._id}`).emit("donorArrived", {
      requestId: request._id,
      donor: {
        id: donor._id,
        fullName: donor.fullName,
        bloodGroup: donor.bloodGroup,
      },
      message: `${donor.fullName} has arrived at the hospital`,
      timestamp: new Date(),
    })
  }

  // Broadcast request update to all relevant parties
  async broadcastRequestUpdate(requestId: string) {
    const request = await this.bloodRequestModel
      .findById(requestId)
      .populate<{ 
        createdBy: HydratedDocument<User>
        assignedDonors: HydratedDocument<User>[]
      }>("createdBy")
      .populate("assignedDonors")

    if (!request) return

    const createdBy = request.createdBy

    const updateData = {
      requestId: request._id,
      status: request.status,
      unitsConfirmed: request.unitsConfirmed,
      unitsNeeded: request.unitsNeeded,
      donorResponseStatus: request.donorResponseStatus,
      timestamp: new Date(),
    }

    // Notify bridger
    this.server.to(`user:${createdBy._id}`).emit("requestUpdated", updateData)

    // Notify assigned donors
    if (request.assignedDonors) {
      request.assignedDonors.forEach((donor) => {
        this.server.to(`user:${donor._id}`).emit("requestUpdated", updateData)
      })
    }
  }

  // Helper methods
  private getSocketIdByUserId(userId: string): string | undefined {
    for (const [socketId, user] of this.connectedUsers.entries()) {
      if (user.userId === userId) {
        return socketId
      }
    }
    return undefined
  }

  private async findNearbyDonors(bloodType: string, location: { lat: number; lng: number }, radiusKm: number) {
    return this.userModel.find({
      role: UserRole.DONOR,
      bloodGroup: bloodType,
      isAvailable: true,
      geoLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.lng, location.lat],
          },
          $maxDistance: radiusKm * 1000, // Convert km to meters
        },
      },
    })
  }

  private calculateDistance(point1: { lat: number; lng: number }, point2: any): number {
    if (!point2?.coordinates) return 0

    const R = 6371 // Earth's radius in km
    const dLat = this.deg2rad(point2.coordinates[1] - point1.lat)
    const dLon = this.deg2rad(point2.coordinates[0] - point1.lng)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(point1.lat)) *
        Math.cos(this.deg2rad(point2.coordinates[1])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }
}