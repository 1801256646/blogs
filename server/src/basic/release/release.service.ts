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
      .leftJoinAndSelect('release.user', 'releaseUser')
      .leftJoinAndSelect('review.childReview', 'reply')
      .leftJoinAndSelect('review.user', 'reviewUser')
      .leftJoinAndSelect('reply.user', 'replyUser')
      .where('release.id=:id', { id: +id })
      .andWhere('release.status=1')
      .getOne();
    return resultCode({ data: entity });
  }

  async findAll() {
    return await this.releaseRepository.find();
  }

  async release(releaseDto: ReleaseDto) {
    const { img, creator, type } = releaseDto;
    if (img?.length > 5) {
      return resultCode({
        code: Code.API_ERROR,
        message: '发布的图片不能超过5张。',
      });
    }
    try {
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
        img,
        createTime: new Date(),
        updateTime: new Date(),
        status: ReleaseStatus.Success,
        owner: approverEntity.owner,
        focus: 0,
        browse: 0,
        user: userEntity,
        type,
      });
      return resultCode();
    } catch (err) {
      return resultCode({ code: Code.API_ERROR, message: err });
    }
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
