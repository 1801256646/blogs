import { Body, Controller, Post } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyComment } from './reply.interface';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  async reply(@Body() body: ReplyComment) {
    return this.replyService.reply(body);
  }
}
