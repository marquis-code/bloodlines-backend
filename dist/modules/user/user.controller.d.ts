import { UserService } from "./user.service";
import { UpdateUserProfileDto } from "./dtos/update-user-profile.dto";
import { ChangePasswordDto } from "./dtos/change-password.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    me(user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUser(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateProfile(user: any, updateData: UpdateUserProfileDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    changePassword(user: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
