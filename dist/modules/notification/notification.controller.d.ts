import { NotificationService } from "./notification.service";
import { UpdateNotificationPreferencesDto } from "./dtos/update-notification-preferences.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getPreferences(user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/notification-preference.schema").NotificationPreference, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/notification-preference.schema").NotificationPreference & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePreferences(user: any, updateDto: UpdateNotificationPreferencesDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/notification-preference.schema").NotificationPreference, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/notification-preference.schema").NotificationPreference & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getHistory(user: any, paginationDto: PaginationDto): Promise<{
        data: (import("./schemas/notification.schema").Notification & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
    markRead(user: any, id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/notification.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/notification.schema").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    markAllRead(user: any): Promise<{
        message: string;
    }>;
}
