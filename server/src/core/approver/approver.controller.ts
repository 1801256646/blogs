import { Controller, Get } from '@nestjs/common';
import { ApproverService } from './approver.service';

@Controller('approver')
export class ApproverController {
  constructor(private readonly approverService: ApproverService) {}

  @Get()
  async findAll() {
    return this.approverService.findAll();
  }
}
