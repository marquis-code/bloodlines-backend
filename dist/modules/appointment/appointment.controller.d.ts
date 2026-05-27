import { AppointmentService } from "./appointment.service";
import { BookAppointmentDto } from "./dtos/book-appointment.dto";
export declare class AppointmentController {
    private appointmentService;
    constructor(appointmentService: AppointmentService);
    bookAppointment(user: any, dto: BookAppointmentDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/appointment.schema").Appointment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    rescheduleAppointment(user: any, id: string, date: string, timeSlot: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/appointment.schema").Appointment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    cancelAppointment(user: any, id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/appointment.schema").Appointment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getMyAppointments(user: any): Promise<(import("./schemas/appointment.schema").Appointment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
