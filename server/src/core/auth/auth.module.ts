import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@/core/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthController],
  controllers: [AuthController],
})
export class AuthModule {}
