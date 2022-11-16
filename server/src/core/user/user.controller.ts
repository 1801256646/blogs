import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { CreateUser, UpdateDto, UserFocus, GetAllUser } from './user.interface';
import { UserService } from './user.service';
import { PasswordService } from '../password/password.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

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
    return data;
  }

  @Get('/')
  async get() {
    const data = await this.userService
      .createQueryBuilder('user')
      .orderBy('user.id', 'ASC')
      .getMany();
    return data.slice(0, 3);
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
      return [];
    }
    query.where('user.id in (:users)', { users });
    const [list, total] = await query.getManyAndCount();
    return {
      list,
      total,
    };
  }

  @Post('/add')
  addUser(@Body() body: CreateUser) {
    return this.userService.add(body);
  }

  @UseGuards(JwtGuard)
  @Post('/update')
  async update(@Body() body: UpdateDto) {
    const data = await this.userService.update(body.username, body);
    await this.passwordService.update(body.username, {
      password: body.password,
    });
    return data;
  }

  @Get('/create')
  createUser() {
    return this.userService.create();
  }

  @UseGuards(JwtGuard)
  @Post('/focus')
  async focus(@Body() body: UserFocus) {
    return this.userService.focus(body);
  }

  @Get('/get-all')
  async getAll(@Query() query: GetAllUser) {
    return await this.userService.findAll(query);
  }
}
