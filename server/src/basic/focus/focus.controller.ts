import { Controller, Get, Query } from '@nestjs/common';
import { FocusService } from './focus.service';
import { FocusDto, CollectionDto } from './focus.interface';

@Controller('focus')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  // 对文章点赞
  @Get()
  async focus(@Query() dto: FocusDto) {
    return await this.focusService.focus(dto);
  }

  // 收藏当前文章
  @Get('/collection')
  async collection(@Query() dto: CollectionDto) {
    return await this.focusService.collection(dto);
  }

  // 浏览当前文章
  @Get('/browse')
  async browse(@Query('id') id: number) {
    return await this.focusService.browse(id);
  }
}
