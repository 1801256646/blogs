import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get('/')
  getAll() {
    return this.userService.findAll();
  }

  @Post('/add')
  addUser(@Body() body: CreateUser) {
    return this.userService.add(body);
  }

  @Get('create')
  createUser() {
    return this.userService.create();
  }
}
