import { Module } from '@nestjs/common';
import { ReleaseModule } from '@/basic/release/release.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [ReleaseModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
