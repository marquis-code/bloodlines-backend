
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { BloodRequestService } from "./blood-request.service"
import { BloodRequestType } from "./types/blood-request.type"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CreateBloodRequestDto } from "./dtos/create-blood-request.dto"
import { CurrentUser } from "../auth/decorators/current-user.decorator"
import { PriorityLevel } from "../../common/enums/priority-level.enum"

@Resolver(() => BloodRequestType)
export class BloodRequestResolver {
  constructor(private bloodRequestService: BloodRequestService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BloodRequestType)
  async createBloodRequest(@CurrentUser() user: any, @Args("input") createDto: CreateBloodRequestDto) {
    return this.bloodRequestService.createBloodRequest(user.sub, createDto)
  }

  @Query(() => [BloodRequestType])
  async getActiveRequests(
    @Args("limit", { defaultValue: 10 }) limit: number,
    @Args("skip", { defaultValue: 0 }) skip: number,
  ) {
    return this.bloodRequestService.getActiveRequests(limit, skip)
  }

  @Query(() => [BloodRequestType])
  async getAllRequests(
    @Args("limit", { defaultValue: 10 }) limit: number,
    @Args("skip", { defaultValue: 0 }) skip: number,
  ) {
    return this.bloodRequestService.getAllRequests(limit, skip)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [BloodRequestType])
  async getMyRequests(
    @CurrentUser() user: any,
    @Args("limit", { defaultValue: 10 }) limit: number,
    @Args("skip", { defaultValue: 0 }) skip: number,
  ) {
    return this.bloodRequestService.getRequestsByUser(user.sub, limit, skip)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BloodRequestType)
  async confirmDonation(@CurrentUser() user: any, @Args("requestId") requestId: string) {
    return this.bloodRequestService.confirmDonation(requestId, user.sub)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BloodRequestType)
  async updateBloodRequest(
    @CurrentUser() user: any,
    @Args("requestId") requestId: string,
    @Args("priorityLevel", { nullable: true }) priorityLevel?: PriorityLevel,
    @Args("unitsNeeded", { nullable: true }) unitsNeeded?: number,
    @Args("contactPhone", { nullable: true }) contactPhone?: string,
    @Args("additionalNotes", { nullable: true }) additionalNotes?: string,
  ) {
    return this.bloodRequestService.updateRequest(requestId, user.sub, {
      priorityLevel,
      unitsNeeded,
      contactPhone,
      additionalNotes,
    })
  }
}