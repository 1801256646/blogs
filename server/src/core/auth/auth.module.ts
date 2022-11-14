import { Module } from '@nestjs/common';
import { Secret } from './auth.contants';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '@/core/user/user.module';
import { PasswordModule } from '../password/password.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PasswordModule,
    JwtModule.register({
      secret: Secret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
