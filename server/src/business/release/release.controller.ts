import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { ReleaseService } from './release.service';
import { ReleaseDto, ApproverDto } from './release.interface';

@Controller('release')
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}
  @Get()
  getOne(@Query('id') id: number) {
    return this.releaseService.findOne(id);
  }

  @Get('list')
  get(@Query('owner') owner: string) {
    return this.releaseService.getApproverList(owner);
  }

  @Post()
  async release(@Body() body: ReleaseDto) {
    return this.releaseService.release(body);
  }

  @Post('approver')
  async approver(@Body() body: ApproverDto) {
    return this.releaseService.approver(body);
  }
}
