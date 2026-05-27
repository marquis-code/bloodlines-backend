"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const appointment_schema_1 = require("./schemas/appointment.schema");
let AppointmentService = class AppointmentService {
    constructor(appointmentModel) {
        this.appointmentModel = appointmentModel;
    }
    async bookAppointment(userId, dto) {
        const existing = await this.appointmentModel.findOne({
            donorId: userId,
            date: new Date(dto.date),
            status: appointment_schema_1.AppointmentStatus.SCHEDULED
        });
        if (existing) {
            throw new common_1.BadRequestException("You already have an appointment on this date");
        }
        const appointment = new this.appointmentModel({
            donorId: new mongoose_2.Types.ObjectId(userId),
            facilityName: dto.facilityName,
            date: new Date(dto.date),
            timeSlot: dto.timeSlot,
        });
        return appointment.save();
    }
    async rescheduleAppointment(userId, appointmentId, newDate, newTimeSlot) {
        const appointment = await this.appointmentModel.findOne({ _id: appointmentId, donorId: userId });
        if (!appointment)
            throw new common_1.NotFoundException("Appointment not found");
        if (appointment.status !== appointment_schema_1.AppointmentStatus.SCHEDULED) {
            throw new common_1.BadRequestException("Can only reschedule scheduled appointments");
        }
        appointment.date = new Date(newDate);
        appointment.timeSlot = newTimeSlot;
        return appointment.save();
    }
    async cancelAppointment(userId, appointmentId) {
        const appointment = await this.appointmentModel.findOne({ _id: appointmentId, donorId: userId });
        if (!appointment)
            throw new common_1.NotFoundException("Appointment not found");
        if (appointment.status !== appointment_schema_1.AppointmentStatus.SCHEDULED) {
            throw new common_1.BadRequestException("Can only cancel scheduled appointments");
        }
        appointment.status = appointment_schema_1.AppointmentStatus.CANCELLED;
        return appointment.save();
    }
    async getMyAppointments(userId) {
        return this.appointmentModel.find({ donorId: userId }).sort({ date: 1, timeSlot: 1 }).lean();
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map