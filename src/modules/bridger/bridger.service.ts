import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { BloodRequest } from "../blood-request/schema/blood-request.schema";
import { Inventory } from "../inventory/schemas/inventory.schema";
import { Appointment } from "../appointment/schemas/appointment.schema";
import { NotificationService } from "../notification/notification.service";
import { EmergencyAlertDto } from "./dtos/emergency-alert.dto";

@Injectable()
export class BridgerService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(BloodRequest.name) private bloodRequestModel: Model<BloodRequest>,
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    private notificationService: NotificationService,
  ) {}

  private async getFacilityName(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.facilityName) {
      throw new BadRequestException("User does not have an associated facility");
    }
    return user.facilityName;
  }

  async getDashboardStats(userId: string) {
    const facilityName = await this.getFacilityName(userId);
    const user = await this.userModel.findById(userId);

    const [activeRequests, inventory, appointments] = await Promise.all([
      this.bloodRequestModel.countDocuments({ createdBy: userId, status: { $in: ["PENDING", "ACCEPTED"] } }),
      this.inventoryModel.find({ facilityName }),
      this.appointmentModel.countDocuments({ facilityName, date: { $gte: new Date() } })
    ]);

    // Count donors nearby (mock radius based on state/city)
    const donorsNearby = await this.userModel.countDocuments({ 
      role: "DONOR", 
      state: user?.state, 
      isAvailable: true 
    });

    return {
      activeRequests,
      inventorySummary: inventory.map(inv => ({ bloodType: inv.bloodType, units: inv.units })),
      donorsNearby,
      upcomingAppointments: appointments
    };
  }

  async searchDonors(userId: string, bloodType?: string, state?: string, page = 1, limit = 10) {
    const query: any = { role: "DONOR", isAvailable: true };
    if (bloodType) query.bloodGroup = bloodType;
    if (state) query.state = state;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.userModel.find(query).select("fullName bloodGroup state city anonymous donationCount").skip(skip).limit(limit).lean(),
      this.userModel.countDocuments(query)
    ]);

    const mappedData = data.map(d => ({
      id: d._id,
      name: d.anonymous ? "Anonymous Donor" : d.fullName,
      bloodGroup: d.bloodGroup,
      location: `${d.city}, ${d.state}`,
      donationCount: d.donationCount
    }));

    return {
      data: mappedData,
      page,
      limit,
      total,
      hasMore: total > skip + data.length
    }
  }

  async getAppointments(userId: string, page = 1, limit = 10) {
    const facilityName = await this.getFacilityName(userId);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.appointmentModel.find({ facilityName }).populate("donorId", "fullName bloodGroup").sort({ date: 1, timeSlot: 1 }).skip(skip).limit(limit).lean(),
      this.appointmentModel.countDocuments({ facilityName })
    ]);

    return {
      data,
      page,
      limit,
      total,
      hasMore: total > skip + data.length
    };
  }

  async sendEmergencyAlert(userId: string, dto: EmergencyAlertDto) {
    const facilityName = await this.getFacilityName(userId);
    const user = await this.userModel.findById(userId);

    // Find available donors in the same state with matching blood types
    const donors = await this.userModel.find({
      role: "DONOR",
      isAvailable: true,
      bloodGroup: { $in: dto.targetBloodGroups },
      state: user?.state
    }).select("_id");

    const donorIds = donors.map(d => d._id.toString());

    await this.notificationService.sendNotificationToMultipleUsers(donorIds, {
      title: `🚨 EMERGENCY BLOOD REQUEST: ${facilityName}`,
      body: dto.message,
      type: "blood_request",
      data: { facilityName, targetBloodGroups: dto.targetBloodGroups }
    });

    return { success: true, notifiedCount: donorIds.length };
  }
}
