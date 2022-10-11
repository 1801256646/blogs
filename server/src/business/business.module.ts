import { Module } from '@nestjs/common';
import { TrendingModule } from './trending/trending.module';

@Module({
  imports: [TrendingModule],
})
export class BusinessModule {}
