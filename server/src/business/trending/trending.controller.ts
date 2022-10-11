import { Controller, Get, Query } from '@nestjs/common';
import { TrendingService } from './trending.service';
import { HomeListDto } from './trending.interface';

@Controller('trending')
export class TrendingController {
  constructor(private readonly trendingService: TrendingService) {}

  @Get()
  async home(@Query() query: HomeListDto) {
    return await this.trendingService.home(query);
  }
}
