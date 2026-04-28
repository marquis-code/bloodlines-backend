import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger"
import { CurrentUser } from "../auth/decorators/current-user.decorator"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUserType, UserType } from "./types/user.type"
import { UserService } from "./user.service"

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOperation({ summary: "Get the authenticated user profile" })
  @ApiQuery({
    name: "includeDashboard",
    required: false,
    type: Boolean,
    description: "When true, includes the donor dashboard payload for donor accounts.",
  })
  @ApiOkResponse({ type: CurrentUserType })
  async me(@CurrentUser() user: any, @Query("includeDashboard") includeDashboard?: string) {
    return this.userService.getUserById(user.userId, {
      includeDashboard: includeDashboard === "true",
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get a user profile by id" })
  @ApiOkResponse({ type: UserType })
  async getUser(@Param("id") id: string) {
    return this.userService.getUserById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post("profile")
  @ApiOperation({ summary: "Update the authenticated user profile" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        fullName: { type: "string", example: "Abdul Matthew" },
        phoneNumber: { type: "string", example: "+2348012345678" },
        location: { type: "string", example: "Lagos, Nigeria" },
        bloodGroup: { type: "string", example: "B+" },
        genotype: { type: "string", example: "AA" },
      },
    },
  })
  @ApiOkResponse({ type: UserType })
  async updateProfile(
    @CurrentUser() user: any,
    @Body()
    updateData: {
      fullName?: string
      phoneNumber?: string
      location?: string
      bloodGroup?: string
      genotype?: string
    },
  ) {
    return this.userService.updateProfile(user.userId, updateData)
  }
}
