import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resultCode, Code } from '@/common/utils/api-code';
import { Repository } from 'typeorm';
import { TypeormHelperService } from '@/common/typeorm-helper/typeorm-helper.service';
import { User } from './entity/user.entity';
import { CreateUser, UpdateDto, UserFocus } from './user.interface';
import { PasswordService } from '../password/password.service';

@Injectable()
export class UserService extends TypeormHelperService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {
    super(userRepository);
  }

  async create() {
    return this.userRepository.createQueryBuilder('user').getManyAndCount();
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    if (!id) return;
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findNameOne(username: string) {
    if (!username) return;
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.release', 'userRelease')
      .leftJoinAndSelect('user.review', 'userReview')
      .leftJoinAndSelect('user.reply', 'userReply')
      .where('user.username = :username', { username })
      .getOne();
    return data;
  }

  async add(user: CreateUser) {
    const { password, username, cname } = user;
    const entity = await this.findNameOne(username);
    if (entity) {
      return resultCode({ message: '用户名已存在', code: Code.API_ERROR });
    }
    const list = await this.userRepository.insert({
      username,
      cname,
      createTime: new Date(),
    });
    await this.passwordService.add({
      username,
      password,
    });
    if (list) {
      return resultCode();
    }
    return resultCode({ message: '新增失败', code: Code.API_ERROR });
  }

  async focus(dto: UserFocus) {
    const { userFocus, userId } = dto;
    const entity = await this.findOne(userId);
    const userFocusEntity = await this.findOne(userFocus);
    if (!entity) {
      return resultCode({ code: Code.API_ERROR, message: '当前用户不存在' });
    }
    if (entity.userFocus?.find((item) => item === userFocus)) {
      const remote = { ...entity };
      remote.userFocus.splice(
        remote.userFocus.findIndex((item) => item === userFocus),
        1,
      );
      await this.update(entity.username, {
        userFocus: remote.userFocus,
      });
      const removeEntity = { ...userFocusEntity };
      removeEntity.userFanc.splice(
        removeEntity.userFanc.findIndex((item) => item === userId),
        1,
      );
      const updateEntitu = await this.update(userFocusEntity.username, {
        userFanc: removeEntity.userFanc,
      });
      return resultCode({ data: updateEntitu });
    }

    await this.update(entity.username, {
      userFocus: [...(entity?.userFocus || []), userFocus],
    });
    const updateEntity = await this.update(userFocusEntity.username, {
      userFanc: [...(userFocusEntity?.userFanc || []), userId],
    });
    return resultCode({ data: updateEntity });
  }

  async update(name: string, updateDto: UpdateDto) {
    const entity = await this.findNameOne(name);
    const updateEntity = this.userRepository.merge(entity, updateDto);
    return this.userRepository.save(updateEntity);
  }
}
