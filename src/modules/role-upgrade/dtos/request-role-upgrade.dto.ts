import { IsEnum, IsString } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { UserRole } from "../../../common/enums/role.enum";

@InputType()
export class RequestRoleUpgradeDto {
  @Field(() => UserRole)
  @IsEnum(UserRole)
  requestedRole: UserRole;

  @Field()
  @IsString()
  facilityName: string;

  @Field()
  @IsString()
  facilityAddress: string;

  @Field()
  @IsString()
  reason: string;
}
