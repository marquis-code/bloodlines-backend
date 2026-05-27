import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Appointment, AppointmentStatus } from "./schemas/appointment.schema";
import { BookAppointmentDto } from "./dtos/book-appointment.dto";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
  ) {}

  async bookAppointment(userId: string, dto: BookAppointmentDto) {
    const existing = await this.appointmentModel.findOne({
      donorId: userId,
      date: new Date(dto.date),
      status: AppointmentStatus.SCHEDULED
    });

    if (existing) {
      throw new BadRequestException("You already have an appointment on this date");
    }

    const appointment = new this.appointmentModel({
      donorId: new Types.ObjectId(userId),
      facilityName: dto.facilityName,
      date: new Date(dto.date),
      timeSlot: dto.timeSlot,
    });

    return appointment.save();
  }

  async rescheduleAppointment(userId: string, appointmentId: string, newDate: string, newTimeSlot: string) {
    const appointment = await this.appointmentModel.findOne({ _id: appointmentId, donorId: userId });
    if (!appointment) throw new NotFoundException("Appointment not found");
    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new BadRequestException("Can only reschedule scheduled appointments");
    }

    appointment.date = new Date(newDate);
    appointment.timeSlot = newTimeSlot;
    return appointment.save();
  }

  async cancelAppointment(userId: string, appointmentId: string) {
    const appointment = await this.appointmentModel.findOne({ _id: appointmentId, donorId: userId });
    if (!appointment) throw new NotFoundException("Appointment not found");
    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new BadRequestException("Can only cancel scheduled appointments");
    }

    appointment.status = AppointmentStatus.CANCELLED;
    return appointment.save();
  }

  async getMyAppointments(userId: string) {
    return this.appointmentModel.find({ donorId: userId }).sort({ date: 1, timeSlot: 1 }).lean();
  }
}
