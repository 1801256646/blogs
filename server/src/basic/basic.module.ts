import { Module } from '@nestjs/common';
import { ReviewModule } from './review/review.module';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [ReviewModule, ReplyModule],
})
export class BasicModule {}
