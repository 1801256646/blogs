import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@/core/user/user.service';
import { PasswordService } from '../password/password.service';
import { resultCode, Code } from '@/common/utils/api-code';
import { LoginUser, UpdateUser } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  @Post('/')
  async login(@Body() body: LoginUser) {
    const { username, password } = body;
    const passwordEntity = await this.passwordService.findOne(username);
    if (!passwordEntity) {
      return resultCode({ code: Code.API_ERROR, message: '不存在该用户' });
    }
    if (password !== passwordEntity.password) {
      return resultCode({ code: Code.API_ERROR, message: '密码错误' });
    }
    const userEntity = await this.userService.findNameOne(username);
    return resultCode({
      data: {
        ...userEntity,
        password,
      },
    });
  }

  @Post('/update')
  async update(@Body() body: UpdateUser) {
    const { username, password, oldPassword } = body;
    const passwordEntity = await this.passwordService.findOne(username);
    if (passwordEntity.password === oldPassword) {
      const updateEntity = await this.passwordService.update(username, {
        ...passwordEntity,
        password,
      });
      return resultCode({ data: updateEntity });
    }
    return resultCode({ code: Code.API_ERROR, message: '旧密码错误' });
  }
}
