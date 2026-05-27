import { Model, Types } from "mongoose";
import { Appointment } from "./schemas/appointment.schema";
import { BookAppointmentDto } from "./dtos/book-appointment.dto";
export declare class AppointmentService {
    private appointmentModel;
    constructor(appointmentModel: Model<Appointment>);
    bookAppointment(userId: string, dto: BookAppointmentDto): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    rescheduleAppointment(userId: string, appointmentId: string, newDate: string, newTimeSlot: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    cancelAppointment(userId: string, appointmentId: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getMyAppointments(userId: string): Promise<(Appointment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
