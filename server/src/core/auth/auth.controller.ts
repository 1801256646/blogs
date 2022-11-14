import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UpdateUser } from './auth.interface';
import { LocalGuard } from './guard/loca.guard';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('/')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  async getUser(@Request() req) {
    const { id } = req.user;
    return await this.userService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Post('/update')
  async update(@Body() body: UpdateUser) {
    return this.authService.update(body);
  }
}
