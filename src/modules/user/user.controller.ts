import { Controller, Get, Post, Body, Param, UseGuards, Put } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"
import { UpdateUserProfileDto } from "./dtos/update-user-profile.dto"
import { ChangePasswordDto } from "./dtos/change-password.dto"

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
        return this.userService.getPublicProfile(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put("me")
    async updateProfile(
        @CurrentUser() user: any,
        @Body() updateData: UpdateUserProfileDto
    ) {
        return this.userService.updateProfile(user.userId, updateData)
    }

    @UseGuards(JwtAuthGuard)
    @Put("me/change-password")
    async changePassword(
        @CurrentUser() user: any,
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        return this.userService.changePassword(user.userId, changePasswordDto.oldPassword, changePasswordDto.newPassword)
    }
}
