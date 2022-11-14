import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { FocusService } from './focus.service';
import { FocusDto, CollectionDto } from './focus.interface';
import { JwtGuard } from '@/core/auth/guard/jwt.guard';

@Controller('focus')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  // 对文章点赞
  @UseGuards(JwtGuard)
  @Get()
  async focus(@Query() dto: FocusDto, @Request() req) {
    return await this.focusService.focus(dto, req.user.username);
  }

  // 收藏当前文章
  @UseGuards(JwtGuard)
  @Get('/collection')
  async collection(@Query() dto: CollectionDto, @Request() req) {
    return await this.focusService.collection(dto, req.user.username);
  }

  // 浏览当前文章
  @Get('/browse')
  async browse(@Query('id') id: number) {
    return await this.focusService.browse(id);
  }
}
