import { Controller, Post, Get, Body, Param, Query, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { BloodRequestService } from "./blood-request.service"
import { CreateBloodRequestDto } from "./dtos/create-blood-request.dto"
import { UpdateBloodRequestDto } from "./dtos/update-blood-request.dto"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@ApiTags("Blood Requests")
@ApiBearerAuth()
@Controller("blood-requests")
export class BloodRequestController {

    constructor(private bloodRequestService: BloodRequestService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createBloodRequest(@CurrentUser() user: any, @Body() createDto: CreateBloodRequestDto) {
        return this.bloodRequestService.createBloodRequest(user.userId, createDto)
    }

    @Get("active")
    async getActiveRequests(@Query("limit") limit = 10, @Query("skip") skip = 0) {
        return this.bloodRequestService.getActiveRequests(Number(limit), Number(skip))
    }

    @Get("all")
    async getAllRequests(@Query("limit") limit = 10, @Query("skip") skip = 0) {
        return this.bloodRequestService.getAllRequests(Number(limit), Number(skip))
    }

    @UseGuards(JwtAuthGuard)
    @Get("my")
    async getMyRequests(@CurrentUser() user: any, @Query("limit") limit = 10, @Query("skip") skip = 0) {
        return this.bloodRequestService.getRequestsByUser(user.userId, Number(limit), Number(skip))
    }

    @UseGuards(JwtAuthGuard)
    @Get("donor")
    async getRequestsForDonor(@CurrentUser() user: any, @Query("limit") limit = 10, @Query("skip") skip = 0) {
        return this.bloodRequestService.getRequestsForDonor(user.userId, Number(limit), Number(skip))
    }

    @UseGuards(JwtAuthGuard)
    @Get(":requestId")
    async getRequestById(@Param("requestId") requestId: string) {
        return this.bloodRequestService.getRequestById(requestId)
    }

    @UseGuards(JwtAuthGuard)
    @Post(":requestId/accept")
    async acceptBloodRequest(@CurrentUser() user: any, @Param("requestId") requestId: string) {
        return this.bloodRequestService.acceptBloodRequest(requestId, user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post(":requestId/confirm")
    async confirmDonation(@CurrentUser() user: any, @Param("requestId") requestId: string) {
        return this.bloodRequestService.confirmDonation(requestId, user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post(":requestId/arrival-alert")
    async notifyDonorArrival(@CurrentUser() user: any, @Param("requestId") requestId: string) {
        return this.bloodRequestService.notifyDonorArrival(requestId, user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post(":requestId/escalate")
    async escalateRequest(@CurrentUser() user: any, @Param("requestId") requestId: string) {
        return this.bloodRequestService.escalateRequest(requestId, user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post(":requestId/update")
    async updateBloodRequest(
        @CurrentUser() user: any,
        @Param("requestId") requestId: string,
        @Body() updateDto: UpdateBloodRequestDto
    ) {
        return this.bloodRequestService.updateRequest(requestId, user.userId, updateDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post(":requestId/cancel")
    async cancelBloodRequest(@CurrentUser() user: any, @Param("requestId") requestId: string) {
        return this.bloodRequestService.cancelRequest(requestId, user.userId)
    }
}
