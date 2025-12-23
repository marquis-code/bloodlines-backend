import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import type { BloodRequestService } from "./blood-request.service"
import { BloodRequestType } from "./types/blood-request.type"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import type { CreateBloodRequestDto } from "./dtos/create-blood-request.dto"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@Resolver(() => BloodRequestType)
export class BloodRequestResolver {
  constructor(private bloodRequestService: BloodRequestService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BloodRequestType)
  async createBloodRequest(@Args("input") createDto: CreateBloodRequestDto, @CurrentUser() user: any) {
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
    @Args("limit", { defaultValue: 10 }) limit: number,
    @Args("skip", { defaultValue: 0 }) skip: number,
    @CurrentUser() user: any,
  ) {
    return this.bloodRequestService.getRequestsByUser(user.sub, limit, skip)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BloodRequestType)
  async confirmDonation(@Args("requestId") requestId: string, @CurrentUser() user: any) {
    return this.bloodRequestService.confirmDonation(requestId, user.sub)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BloodRequestType)
  async updateBloodRequest(
    @Args("requestId") requestId: string,
    @Args("priorityLevel", { nullable: true }) priorityLevel?: string,
    @Args("unitsNeeded", { nullable: true }) unitsNeeded?: number,
    @Args("contactPhone", { nullable: true }) contactPhone?: string,
    @Args("additionalNotes", { nullable: true }) additionalNotes?: string,
    @CurrentUser() user: any,
  ) {
    return this.bloodRequestService.updateRequest(requestId, user.sub, {
      priorityLevel,
      unitsNeeded,
      contactPhone,
      additionalNotes,
    })
  }
}
