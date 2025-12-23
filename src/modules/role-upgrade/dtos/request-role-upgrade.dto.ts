import { IsEnum, IsString } from "class-validator"
import { UserRole } from "../../../common/enums/role.enum"

export class RequestRoleUpgradeDto {
  @IsEnum(UserRole)
  requestedRole: UserRole

  @IsString()
  facilityName: string

  @IsString()
  facilityAddress: string

  @IsString()
  reason: string
}
