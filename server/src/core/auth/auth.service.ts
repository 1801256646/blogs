import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PasswordService } from '../password/password.service';
import { User } from '../user/entity/user.entity';
import { UpdateUser } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findNameOne(username);
    const passwordEntity = await this.passwordService.findOne(username);
    if (user && passwordEntity.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const { id, username } = user;
    return {
      token: this.jwtService.sign({ username, sub: id }),
      user,
    };
  }

  async update(body: UpdateUser) {
    const { username, password, oldPassword } = body;
    const passwordEntity = await this.passwordService.findOne(username);
    if (passwordEntity.password === oldPassword) {
      const updateEntity = await this.passwordService.update(username, {
        ...passwordEntity,
        password,
      });
      return updateEntity;
    }
    throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
  }
}
