import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AppointmentService } from "./appointment.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { BookAppointmentDto } from "./dtos/book-appointment.dto";

@ApiTags("Appointments")
@ApiBearerAuth()
@Controller("appointments")
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: "Book a donation appointment" })
  async bookAppointment(@CurrentUser() user: any, @Body() dto: BookAppointmentDto) {
    return this.appointmentService.bookAppointment(user.userId, dto);
  }

  @Put(":id/reschedule")
  @ApiOperation({ summary: "Reschedule an appointment" })
  async rescheduleAppointment(
    @CurrentUser() user: any,
    @Param("id") id: string,
    @Body("date") date: string,
    @Body("timeSlot") timeSlot: string
  ) {
    return this.appointmentService.rescheduleAppointment(user.userId, id, date, timeSlot);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Cancel an appointment" })
  async cancelAppointment(@CurrentUser() user: any, @Param("id") id: string) {
    return this.appointmentService.cancelAppointment(user.userId, id);
  }

  @Get()
  @ApiOperation({ summary: "Get my appointments" })
  async getMyAppointments(@CurrentUser() user: any) {
    return this.appointmentService.getMyAppointments(user.userId);
  }
}
