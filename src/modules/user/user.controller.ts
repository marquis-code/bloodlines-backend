import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
export class UserController {

    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async me(@CurrentUser() user: any) {
        return this.userService.getUserById(user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getUser(@Param("id") id: string) {
        return this.userService.getUserById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("profile")
    async updateProfile(
        @CurrentUser() user: any,
        @Body() updateData: {
            fullName?: string
            phoneNumber?: string
            location?: string
            bloodGroup?: string
            genotype?: string
        }
    ) {
        return this.userService.updateProfile(user.userId, updateData)
    }
}
