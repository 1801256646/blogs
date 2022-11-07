import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateUser, UpdateDto, UserFocus } from './user.interface';
import { UserService } from './user.service';
import { PasswordService } from '../password/password.service';
import { resultCode } from '@/common/utils/api-code';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  @Get('/get-user')
  async getUser(@Query('id') id: string) {
    const data = await this.userService
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.release', 'userRelease')
      .leftJoinAndSelect('user.review', 'userReview')
      .leftJoinAndSelect('user.reply', 'userReply')
      .where('user.id = :id', { id })
      .getOne();
    return resultCode({ data });
  }

  @Get('/')
  async get() {
    const data = await this.userService
      .createQueryBuilder('user')
      .orderBy('user.id', 'ASC')
      .getMany();
    return resultCode({ data: data.slice(0, 3) });
  }

  @Post('/')
  async getIds(@Body() body: { users?: string[] }) {
    const { users } = body;
    const query = this.userService
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.release', 'userRelease')
      .leftJoinAndSelect('user.review', 'userReview')
      .leftJoinAndSelect('user.reply', 'userReply');
    if (!users?.length) {
      return resultCode({ data: [] });
    }
    query.where('user.id in (:users)', { users });
    const [list, total] = await query.getManyAndCount();
    return resultCode({
      data: {
        list,
        total,
      },
    });
  }

  @Post('/add')
  addUser(@Body() body: CreateUser) {
    return this.userService.add(body);
  }

  @Post('/update')
  async update(@Body() body: UpdateDto) {
    const data = await this.userService.update(body.username, body);
    await this.passwordService.update(body.username, {
      password: body.password,
    });
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
