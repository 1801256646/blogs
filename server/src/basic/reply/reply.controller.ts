import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyComment } from './reply.interface';
import { JwtGuard } from '@/core/auth/guard/jwt.guard';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @UseGuards(JwtGuard)
  @Post()
  async reply(@Body() body: ReplyComment, @Request() req) {
    return this.replyService.reply(body, req.user.username);
  }
}
