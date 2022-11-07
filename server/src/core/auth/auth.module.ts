import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@/core/user/user.module';
import { PasswordModule } from '../password/password.module';

@Module({
  imports: [UserModule, PasswordModule],
  providers: [AuthController],
  controllers: [AuthController],
})
export class AuthModule {}
