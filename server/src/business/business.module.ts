import { Module } from '@nestjs/common';
import { TrendingModule } from './trending/trending.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [TrendingModule, SearchModule],
})
export class BusinessModule {}
