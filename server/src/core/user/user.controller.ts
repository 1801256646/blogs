import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateUser, UpdateDto } from './user.interface';
import { UserService } from './user.service';
import { resultCode } from '@/common/utils/api-code';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-user')
  async getUser(@Query('username') username: string) {
    const data = await this.userService.findNameOne(username);
    return resultCode({ data });
  }

  @Get('/')
  getAll() {
    return this.userService.findAll();
  }

  @Post('/add')
  addUser(@Body() body: CreateUser) {
    return this.userService.add(body);
  }

  @Post('/update')
  async update(@Body() body: UpdateDto) {
    const data = await this.userService.update(body.username, body);
    return resultCode({ data });
  }

  @Get('create')
  createUser() {
    return this.userService.create();
  }
}
