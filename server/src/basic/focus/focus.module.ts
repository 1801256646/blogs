import { Module } from '@nestjs/common';
import { ReleaseModule } from '@/basic/release/release.module';
import { UserModule } from '@/core/user/user.module';
import { FocusController } from './focus.controller';
import { FocusService } from './focus.service';

@Module({
  imports: [ReleaseModule, UserModule],
  controllers: [FocusController],
  exports: [FocusService],
  providers: [FocusService],
})
export class FocusModule {}
