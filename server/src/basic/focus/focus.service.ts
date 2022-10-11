import { Injectable } from '@nestjs/common';
import { ReleaseService } from '@/basic/release/release.service';
import { UserService } from '@/core/user/user.service';
import { resultCode, Code } from '@/common/utils/api-code';
import { FocusDto, CollectionDto } from './focus.interface';

@Injectable()
export class FocusService {
  constructor(
    private releaseService: ReleaseService,
    private userService: UserService,
  ) {}

  async focus(dto: FocusDto) {
    const { username, releaseId } = dto;
    const userEntity = await this.userService.findNameOne(username);
    const releaseEntity = await this.releaseService.findOne(releaseId);
    if (!userEntity) {
      return resultCode({ code: Code.API_ERROR, message: '当前用户不存在' });
    }
    if (userEntity.focus?.find((item) => item === releaseId)) {
      const remote = { ...userEntity };
      remote.focus.splice(
        remote.focus.findIndex((item) => item === releaseId),
        1,
      );
      await this.userService.update(username, {
        focus: remote.focus,
      });
      await this.releaseService.update(releaseId, {
        focus: releaseEntity.data.focus - 1,
      });
      return resultCode();
    }

    const updateRelease = await this.releaseService.update(releaseId, {
      focus: releaseEntity.data.focus + 1,
    });
    await this.userService.update(username, {
      focus: [...(userEntity?.focus || []), releaseId],
    });
    return resultCode({ data: updateRelease });
  }

  async collection(dto: CollectionDto) {
    const { username, releaseId } = dto;
    const userEntity = await this.userService.findNameOne(username);
    if (!userEntity) {
      return resultCode({ code: Code.API_ERROR, message: '当前用户不存在' });
    }
    if (userEntity.collection?.find((item) => item === releaseId)) {
      const remote = { ...userEntity };
      remote.collection.splice(
        remote.collection.findIndex((item) => item === releaseId),
        1,
      );
      await this.userService.update(username, {
        collection: remote.collection,
      });
      return resultCode();
    }
    await this.userService.update(username, {
      collection: [...(userEntity?.collection || []), releaseId],
    });
    return resultCode();
  }

  async browse(releaseId: number) {
    const releaseEntity = await this.releaseService.findOne(releaseId);
    const updateEntity = await this.releaseService.update(releaseId, {
      browse: releaseEntity.data.browse + 1,
    });
    return resultCode({ data: updateEntity });
  }
}
