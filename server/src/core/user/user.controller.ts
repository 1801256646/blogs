import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateUser, UpdateDto, UserFocus } from './user.interface';
import { UserService } from './user.service';
import { resultCode } from '@/common/utils/api-code';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-user')
  async getUser(@Query('username') username: string) {
    const data = await this.userService
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.release', 'userRelease')
      .leftJoinAndSelect('user.review', 'userReview')
      .leftJoinAndSelect('user.reply', 'userReply')
      .where('user.username = :username', { username })
      .getOne();
    return resultCode({ data });
  }

  @Get('/')
  async getAll() {
    const data = await this.userService
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.release', 'userRelease')
      .leftJoinAndSelect('user.review', 'userReview')
      .leftJoinAndSelect('user.reply', 'userReply')
      .getMany();
    return resultCode({ data });
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

  @Get('/create')
  createUser() {
    return this.userService.create();
  }

  @Post('/focus')
  async focus(@Body() body: UserFocus) {
    return this.userService.focus(body);
  }
}
