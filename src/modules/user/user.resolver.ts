import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import type { UserService } from "./user.service"
import { UserType } from "./types/user.type"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserType)
  async me(user: any) {
    return this.userService.getUserById(user.sub)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserType)
  async getUser(@Args("id") id: string) {
    return this.userService.getUserById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserType)
  async updateProfile(
    user: any,
    @Args("fullName", { nullable: true }) fullName?: string,
    @Args("phoneNumber", { nullable: true }) phoneNumber?: string,
    @Args("location", { nullable: true }) location?: string,
    @Args("bloodGroup", { nullable: true }) bloodGroup?: string,
    @Args("genotype", { nullable: true }) genotype?: string,
  ) {
    return this.userService.updateProfile(user.sub, {
      fullName,
      phoneNumber,
      location,
      bloodGroup,
      genotype,
    })
  }
}
