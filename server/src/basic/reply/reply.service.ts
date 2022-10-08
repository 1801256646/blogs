import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resultCode, Code } from '@/common/utils/api-code';
import { UserService } from '@/core/user/user.service';
import { ReviewService } from '../review/review.service';
import { Reply } from './entity/reply.entity';
import { ReplyComment } from './reply.interface';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    private userService: UserService,
    private reviewService: ReviewService,
  ) {}

  async findOne(id: number) {
    return this.replyRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 回复评论
   */
  async reply(dto: ReplyComment) {
    const { reviewId, replier, text, username } = dto;
    const userEntity = await this.userService.findNameOne(username);
    if (!userEntity) {
      return resultCode({ code: Code.API_ERROR, message: '请先登陆' });
    }
    const reviewEntity = await this.reviewService.findOne(reviewId);
    await this.replyRepository.insert({
      replier,
      text,
      createTime: new Date(),
      childReview: reviewEntity,
      username,
    });
    return resultCode();
  }
}
