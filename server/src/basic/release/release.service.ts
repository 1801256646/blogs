import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '@/core/user/user.service';
import { ReleaseStatus } from '@/common/enum/release';
import { resultCode, Code } from '@/common/utils/api-code';
import { ApproverService } from '@/core/approver/approver.service';
import { TypeormHelperService } from '@/common/typeorm-helper/typeorm-helper.service';
import { Release } from './entity/release.entity';
import { ReleaseDto, ApproverDto, UpdateDto } from './release.interface';

@Injectable()
export class ReleaseService extends TypeormHelperService<Release> {
  constructor(
    @InjectRepository(Release)
    private releaseRepository: Repository<Release>,
    private userService: UserService,
    private approverService: ApproverService,
  ) {
    super(releaseRepository);
  }

  async findOne(id: number) {
    const entity = await this.releaseRepository
      .createQueryBuilder('release')
      .leftJoinAndSelect('release.review', 'review')
      .leftJoinAndSelect('review.childReview', 'childReview')
      .where('release.id=:id', { id: +id })
      .getOne();
    return resultCode({ data: entity });
  }

  async findAll() {
    return await this.releaseRepository.find();
  }

  async release(releaseDto: ReleaseDto) {
    const { img, creator } = releaseDto;
    if (img?.length > 5) {
      return resultCode({
        code: Code.API_ERROR,
        message: '发布的图片不能超过5张。',
      });
    }
    const userEntity = await this.userService.findNameOne(creator);
    if (!userEntity) {
      return resultCode({
        code: Code.API_ERROR,
        message: '请登陆之后，再发布文章。',
      });
    }
    const approverEntity = await this.approverService.find();
    await this.releaseRepository.insert({
      ...releaseDto,
      img: img?.join(';'),
      createTime: new Date(),
      updateTime: new Date(),
      status: ReleaseStatus.UnApproval,
      owner: approverEntity.owner,
      focus: 0,
      browse: 0,
    });
    return resultCode();
  }

  /**
   * 获取当前用户待审批的文章
   */
  async getApproverList(owner: string) {
    const listEntity = await this.findAll();
    const approverList = listEntity.filter((item) => {
      return (
        item.owner.split(';').includes(owner) &&
        item.status === ReleaseStatus.UnApproval
      );
    });
    return resultCode({ data: approverList });
  }

  /**
   * 审批当前文章
   */
  async approver(data: ApproverDto) {
    const { id, status, username } = data;
    const { data: releaseEntity } = await this.findOne(id);
    if (releaseEntity.owner.split(';').includes(username)) {
      await this.update(id, { status });
      return resultCode();
    }
  }

  async update(id: number, updateDto: UpdateDto) {
    const { data: entity } = await this.findOne(id);
    const updateEntity = this.releaseRepository.merge(entity, updateDto);
    return this.releaseRepository.save(updateEntity);
  }
}
