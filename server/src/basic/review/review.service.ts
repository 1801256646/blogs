import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resultCode, Code } from '@/common/utils/api-code';
import { UserService } from '@/core/user/user.service';
import { ReleaseService } from '@/business/release/release.service';
import { Review } from './entity/review.entity';
import { ReviewInterface, UpdateReview } from './review.interface';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private userService: UserService,
    private releaseService: ReleaseService,
  ) {}

  async findOne(id: number) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.childReview', 'child')
      .where('review.id=:id', { id: +id })
      .getOne();
  }

  /**
   * 创建第一条评论
   */
  async create(dto: ReviewInterface) {
    const userEntity = await this.userService.findNameOne(dto.username);
    if (!userEntity) {
      return resultCode({ code: Code.API_ERROR, message: '请先登陆' });
    }
    const { data: releaseEntity } = await this.releaseService.findOne(
      dto.releaseId,
    );
    await this.reviewRepository.insert({
      ...dto,
      createTime: new Date(),
      release: releaseEntity,
    });
    return resultCode();
  }

  async update(id: number, dto: UpdateReview) {
    const entity = await this.findOne(id);
    const updateEntity = this.reviewRepository.merge(entity, dto);
    return this.reviewRepository.save(updateEntity);
  }
}
