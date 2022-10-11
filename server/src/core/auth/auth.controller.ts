import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@/core/user/user.service';
import { resultCode, Code } from '@/common/utils/api-code';
import { LoginUser, UpdateUser } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async login(@Body() body: LoginUser) {
    const { username, password } = body;
    const userEntity = await this.userService.findNameOne(username);
    if (!userEntity) {
      return resultCode({ code: Code.API_ERROR, message: '不存在该用户' });
    }
    if (password === userEntity.password) {
      return resultCode({ data: userEntity });
    }
    return resultCode({ code: Code.API_ERROR, message: '密码错误' });
  }

  @Post('/update')
  async update(@Body() body: UpdateUser) {
    const { username, password, oldPassword } = body;
    const userEntity = await this.userService.findNameOne(username);
    if (userEntity.password === oldPassword) {
      const updateEntity = await this.userService.update(username, {
        ...userEntity,
        password,
      });
      return resultCode({ data: updateEntity });
    }
    return resultCode({ code: Code.API_ERROR, message: '旧密码错误' });
  }
}
