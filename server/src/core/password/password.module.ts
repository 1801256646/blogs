import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './password.service';
import { Password } from './entity/password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Password])],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
