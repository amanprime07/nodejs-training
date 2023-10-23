import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './user.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUser(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  async postTodos(@Body() payload: UserEntity): Promise<UserEntity> {
    return this.userService.save(payload);
  }
}
