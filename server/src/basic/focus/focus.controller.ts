import { Controller, Get, Query } from '@nestjs/common';
import { FocusService } from './focus.service';
import { FocusDto, CollectionDto } from './focus.interface';

@Controller('focus')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  @Get()
  async focus(@Query() dto: FocusDto) {
    return await this.focusService.focus(dto);
  }

  @Get('/collection')
  async collection(@Query() dto: CollectionDto) {
    return await this.focusService.collection(dto);
  }

  @Get('/browse')
  async browse(@Query('id') id: number) {
    return await this.focusService.browse(id);
  }
}
