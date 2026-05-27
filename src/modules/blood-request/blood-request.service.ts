import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from "@nestjs/common"
import { Model, HydratedDocument } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { BloodRequest } from "./schema/blood-request.schema"
import { User } from "../user/schemas/user.schema"
import { UserRole } from "../../common/enums/role.enum"
import { RequestStatus } from "../../common/enums/request-status.enum"
import { DonorResponse } from "../../common/enums/donor-response.enum"
import { CreateBloodRequestDto } from "./dtos/create-blood-request.dto"
import { UpdateBloodRequestDto } from "./dtos/update-blood-request.dto"
import { BloodRequestGateway } from "./blood-request.gateway"
import { BloodRequestWithCreatedBy } from "./interfaces/blood-request-populated.interface"
import { NotificationService } from "../notification/notification.service"

@Injectable()
export class BloodRequestService {
  constructor(
    @InjectModel(BloodRequest.name) private bloodRequestModel: Model<BloodRequest>,
    @InjectModel(User.name) private userModel: Model<User>,
    private bloodRequestGateway: BloodRequestGateway,
    private notificationService: NotificationService,
  ) {}

  async createBloodRequest(userId: string, createDto: CreateBloodRequestDto) {
    const user = await this.userModel.findById(userId)
    if (!user || user.role !== UserRole.BRIDGER) {
      throw new ForbiddenException("Only Bridgers can create blood requests")
    }

    if (!user.geoLocation || !user.geoLocation.coordinates) {
      throw new BadRequestException("Please update your location before creating a blood request")
    }

    const bloodRequest = new this.bloodRequestModel({
      ...createDto,
      createdBy: userId,
      status: RequestStatus.PENDING,
      statusHistory: [{
        status: RequestStatus.PENDING,
        timestamp: new Date(),
        updatedBy: userId,
        note: "Request created"
      }]
    })

    const savedRequest = await bloodRequest.save()
    
    // Populate the createdBy field for notification - properly typed
    const populatedRequest = await this.bloodRequestModel
      .findById(savedRequest._id)
      .populate<{ createdBy: HydratedDocument<User> }>("createdBy", "fullName email facilityName") as BloodRequestWithCreatedBy

    if (!populatedRequest) {
      throw new NotFoundException("Failed to retrieve created request")
    }

    // Notify nearby donors via WebSocket
    const bridgerLocation = {
      lat: user.geoLocation.coordinates[1],
      lng: user.geoLocation.coordinates[0],
    }
    
    await this.bloodRequestGateway.notifyNearbyDonors(populatedRequest, bridgerLocation)

    // Notify nearby donors via Email
    try {
      const nearbyDonors = await this.bloodRequestGateway.findNearbyDonors(
        populatedRequest.bloodType,
        bridgerLocation,
        50 // 50km
      )
      const donorIds = nearbyDonors.map(d => d._id.toString())
      await this.notificationService.notifyNewBloodRequest(donorIds, {
        requestId: savedRequest._id,
        bloodType: populatedRequest.bloodType,
        unitsNeeded: populatedRequest.unitsNeeded,
        priorityLevel: populatedRequest.priorityLevel,
        facilityName: populatedRequest.createdBy.facilityName
      })
    } catch (error) {
      console.error("Failed to send blood request email notifications", error)
    }

    return savedRequest
  }

  async getActiveRequests(limit = 10, skip = 0) {
    return this.bloodRequestModel
      .find({ status: { $ne: RequestStatus.FULFILLED } })
      .populate("createdBy", "fullName email facilityName")
      .populate("assignedDonors", "fullName bloodGroup phoneNumber")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
  }

  async getRequestsByUser(userId: string, limit = 10, skip = 0) {
    return this.bloodRequestModel
      .find({ createdBy: userId })
      .populate("assignedDonors", "fullName bloodGroup phoneNumber")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
  }

  async getRequestsForDonor(donorId: string, limit = 10, skip = 0) {
    const donor = await this.userModel.findById(donorId)
    if (!donor || donor.role !== UserRole.DONOR) {
      throw new ForbiddenException("Only donors can view donor-specific requests")
    }

    // Get requests that match donor's blood group and are still active
    return this.bloodRequestModel
      .find({
        bloodType: donor.bloodGroup,
        status: { $nin: [RequestStatus.FULFILLED, RequestStatus.CANCELLED] },
      })
      .populate("createdBy", "fullName facilityName contactPhone")
      .sort({ priorityLevel: 1, createdAt: -1 })
      .limit(limit)
      .skip(skip)
  }

  async acceptBloodRequest(requestId: string, donorId: string) {
    const donor = await this.userModel.findById(donorId)
    if (!donor || donor.role !== UserRole.DONOR) {
      throw new ForbiddenException("Only donors can accept blood requests")
    }

    const request = await this.bloodRequestModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    if (request.status === RequestStatus.FULFILLED) {
      throw new BadRequestException("This request has already been fulfilled")
    }

    if (request.bloodType !== donor.bloodGroup) {
      throw new BadRequestException("Blood group mismatch")
    }

    // Check if donor already accepted this request
    if (request.assignedDonors?.some(id => id.toString() === donorId)) {
      throw new BadRequestException("You have already accepted this request")
    }

    // Add donor to assigned donors
    if (!request.assignedDonors) {
      request.assignedDonors = []
    }
    request.assignedDonors.push(donor._id as any)

    // Update donor response status
    request.donorResponseStatus = DonorResponse.ACCEPTED

    await request.save()

    // Notify bridger via WebSocket
    await this.bloodRequestGateway.notifyDonorAcceptance(requestId, donorId)
    
    // Notify bridger via Email
    try {
      await this.notificationService.notifyDonorAcceptance(request.createdBy.toString(), {
        fullName: donor.fullName,
        bloodGroup: donor.bloodGroup,
        requestId: request._id
      })
    } catch (error) {
      console.error("Failed to send donor acceptance email notification", error)
    }
    
    // Broadcast update
    await this.bloodRequestGateway.broadcastRequestUpdate(requestId)

    return request
  }

  async confirmDonation(requestId: string, donorId: string) {
    const request = await this.bloodRequestModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    const donor = await this.userModel.findById(donorId)
    if (!donor) {
      throw new NotFoundException("Donor not found")
    }

    // Verify donor is assigned to this request
    if (!request.assignedDonors?.some(id => id.toString() === donorId)) {
      throw new ForbiddenException("You are not assigned to this request")
    }

    request.unitsConfirmed += 1

    // Update donor's donation count and last donation date
    donor.donationCount += 1
    donor.lastDonationDate = new Date()
    
    // Calculate next eligible date (56 days/8 weeks after donation)
    const nextEligible = new Date()
    nextEligible.setDate(nextEligible.getDate() + 56)
    donor.nextEligibleDate = nextEligible
    
    await donor.save()

    // Check if request is fulfilled
    if (request.unitsConfirmed >= request.unitsNeeded) {
      request.status = RequestStatus.FULFILLED
      request.fulfillmentDate = new Date()
      if (!request.statusHistory) request.statusHistory = [];
      request.statusHistory.push({
        status: RequestStatus.FULFILLED,
        timestamp: new Date(),
        updatedBy: donorId,
        note: "Units confirmed by donor"
      });
      await request.save()

      // Notify all parties that request is fulfilled
      await this.bloodRequestGateway.notifyRequestFulfilled(requestId)

      // Notify all assigned donors via Email
      try {
        const donorIds = request.assignedDonors.map(id => id.toString())
        await this.notificationService.notifyRequestFulfilled(donorIds, requestId)
      } catch (error) {
        console.error("Failed to send request fulfillment email notifications", error)
      }
    } else {
      await request.save()
      // Broadcast update
      await this.bloodRequestGateway.broadcastRequestUpdate(requestId)
    }

    return request
  }

  async notifyDonorArrival(requestId: string, donorId: string) {
    const request = await this.bloodRequestModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    // Verify donor is assigned to this request
    if (!request.assignedDonors?.some(id => id.toString() === donorId)) {
      throw new ForbiddenException("You are not assigned to this request")
    }

    const donor = await this.userModel.findById(donorId)
    if (!donor) {
      throw new NotFoundException("Donor not found")
    }

    // Notify bridger via WebSocket
    await this.bloodRequestGateway.notifyDonorArrival(requestId, donorId)

    // Notify bridger via Email
    try {
      await this.notificationService.notifyDonorArrival(request.createdBy.toString(), {
        fullName: donor.fullName,
        bloodGroup: donor.bloodGroup,
        requestId: request._id
      })
    } catch (error) {
      console.error("Failed to send donor arrival email notification", error)
    }

    return { message: "Arrival notification sent" }
  }

  async escalateRequest(requestId: string, userId: string) {
    const request = await this.bloodRequestModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    if (request.createdBy.toString() !== userId) {
      throw new ForbiddenException("You can only escalate your own requests")
    }

    request.unitsEscalated += 1
    request.donorResponseStatus = DonorResponse.ESCALATED
    await request.save()

    // Re-notify donors with escalated priority
    const bridger = await this.userModel.findById(userId)
    if (bridger && bridger.geoLocation?.coordinates) {
      const bridgerLocation = {
        lat: bridger.geoLocation.coordinates[1],
        lng: bridger.geoLocation.coordinates[0],
      }
      
      const populatedRequest = await this.bloodRequestModel
        .findById(requestId)
        .populate<{ createdBy: HydratedDocument<User> }>("createdBy", "fullName email facilityName") as BloodRequestWithCreatedBy
      
      if (populatedRequest) {
        await this.bloodRequestGateway.notifyNearbyDonors(populatedRequest, bridgerLocation)
      }
    }

    return request
  }

  async updateRequest(requestId: string, userId: string, updateDto: UpdateBloodRequestDto) {
    const request = await this.bloodRequestModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    if (request.createdBy.toString() !== userId) {
      throw new ForbiddenException("You can only update your own requests")
    }

    if (request.status === RequestStatus.FULFILLED) {
      throw new BadRequestException("Cannot update fulfilled requests")
    }

    if (updateDto.status && updateDto.status !== request.status) {
      if (!request.statusHistory) request.statusHistory = [];
      request.statusHistory.push({
        status: updateDto.status,
        timestamp: new Date(),
        updatedBy: userId,
        note: "Status updated manually"
      });
    }

    Object.assign(request, updateDto)
    await request.save()

    // Broadcast update to all connected parties
    await this.bloodRequestGateway.broadcastRequestUpdate(requestId)

    return request
  }

  async cancelRequest(requestId: string, userId: string) {
    const request = await this.bloodRequestModel.findById(requestId)
    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    if (request.createdBy.toString() !== userId) {
      throw new ForbiddenException("You can only cancel your own requests")
    }

    request.status = RequestStatus.CANCELLED
    if (!request.statusHistory) request.statusHistory = [];
    request.statusHistory.push({
      status: RequestStatus.CANCELLED,
      timestamp: new Date(),
      updatedBy: userId,
      note: "Request cancelled by user"
    });
    await request.save()

    // Notify all assigned donors
    await this.bloodRequestGateway.broadcastRequestUpdate(requestId)

    return request
  }

  async getAllRequests(limit = 10, skip = 0) {
    return this.bloodRequestModel
      .find()
      .populate("createdBy", "fullName email facilityName")
      .populate("assignedDonors", "fullName bloodGroup phoneNumber")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
  }

  async getRequestById(requestId: string) {
    const request = await this.bloodRequestModel
      .findById(requestId)
      .populate("createdBy", "fullName email facilityName contactPhone")
      .populate("assignedDonors", "fullName bloodGroup phoneNumber email")

    if (!request) {
      throw new NotFoundException("Blood request not found")
    }

    return request
  }
}