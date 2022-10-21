import { Injectable } from '@nestjs/common';
import { ReleaseService } from '@/basic/release/release.service';
import { HomeListDto } from './trending.interface';
import { resultCode } from '@/common/utils/api-code';

@Injectable()
export class TrendingService {
  constructor(private releaseService: ReleaseService) {}

  async home(dto: HomeListDto) {
    const { page, pageSize, orderBy } = dto;
    let sort = 'release.updateTime';
    if (orderBy === 'browse') {
      sort = 'release.browse';
    }
    if (orderBy === 'focus') {
      sort = 'release.focus';
    }

    const query = this.releaseService
      .createQueryBuilder('release')
      .leftJoinAndSelect('release.review', 'review')
      .leftJoinAndSelect('review.childReview', 'childReview')
      .leftJoinAndSelect('release.user', 'releaseUser')
      .leftJoinAndSelect('review.user', 'reviewUser')
      .leftJoinAndSelect('childReview.user', 'replyUser');

    const [list, total] = await query
      .orderBy(sort, 'DESC')
      .skip(pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount();

    return resultCode({
      data: {
        total,
        list,
      },
    });
  }
}
