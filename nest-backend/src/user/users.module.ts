import { Module } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { UsersService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}