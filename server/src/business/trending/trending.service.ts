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
    if (orderBy === 'star') {
      sort = 'release.browse';
    }
    const query = this.releaseService
      .createQueryBuilder('release')
      .leftJoinAndSelect('release.review', 'review')
      .leftJoinAndSelect('review.childReview', 'childReview')
      .offset(pageSize * (page - 1))
      .limit(pageSize);

    const [list, total] = await query.orderBy(sort, 'DESC').getManyAndCount();
    return resultCode({
      data: {
        total,
        list,
      },
    });
  }
}
