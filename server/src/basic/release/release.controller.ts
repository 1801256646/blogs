import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReleaseStatus } from '@/common/enum/release';
import { ReleaseService } from './release.service';
import { ReleaseDto, ApproverDto } from './release.interface';
import { JwtGuard } from '@/core/auth/guard/jwt.guard';

@Controller('release')
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}
  @Get()
  getOne(@Query('id') id: number) {
    return this.releaseService.findOne(id);
  }

  @Get('list')
  get(@Query('owner') owner: string) {
    return this.releaseService.getApproverList(owner);
  }

  @UseGuards(JwtGuard)
  @Post()
  async release(@Body() body: ReleaseDto, @Request() req) {
    return this.releaseService.release(body, req.user.username);
  }

  @Post('approver')
  async approver(@Body() body: ApproverDto) {
    return this.releaseService.approver(body);
  }

  @Post('/get-ids')
  async getIdAll(@Body() body: { releaseId?: string[] }) {
    const { releaseId } = body;
    const query = this.releaseService
      .createQueryBuilder('release')
      .leftJoinAndSelect('release.review', 'review')
      .leftJoinAndSelect('review.childReview', 'reply')
      .leftJoinAndSelect('release.user', 'user')
      .where('release.status=1');
    if (!releaseId?.length) {
      return [];
    }
    query.andWhere('release.id in (:releaseId)', { releaseId });
    const [list, total] = await query.getManyAndCount();
    return {
      list,
      total,
    };
  }

  @Get('/get-all')
  async getAll() {
    return await this.releaseService.findAll();
  }

  @UseGuards(JwtGuard)
  @Delete()
  async delete(@Query('id') id: number) {
    return this.releaseService.update(id, {
      status: ReleaseStatus.Reject,
    });
  }
}
