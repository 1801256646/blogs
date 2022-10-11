import { Module } from '@nestjs/common';
import { TrendingController } from './trending.controller';
import { TrendingService } from './trending.service';
import { ReleaseModule } from '@/basic/release/release.module';

@Module({
  imports: [ReleaseModule],
  exports: [TrendingService],
  controllers: [TrendingController],
  providers: [TrendingService],
})
export class TrendingModule {}
