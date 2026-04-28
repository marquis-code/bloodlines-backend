import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { DonorModule } from "../donor/donor.module"
import { UserController } from "./user.controller"
import { User, UserSchema } from "./schemas/user.schema"
import { UserService } from "./user.service"

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), DonorModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
