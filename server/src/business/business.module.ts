import { Module } from '@nestjs/common';
import { ReleaseModule } from './release/release.module';

@Module({
  imports: [ReleaseModule],
})
export class BusinessModule {}
