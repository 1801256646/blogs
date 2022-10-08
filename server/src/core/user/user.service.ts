import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resultCode, Code } from '@/common/utils/api-code';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create() {
    return this.userRepository.create();
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const entity = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return resultCode({ data: entity });
  }

  async findNameOne(name: string) {
    if (!name) return;
    return await this.userRepository.findOne({
      where: {
        username: name,
      },
    });
  }

  async add(user: CreateUser) {
    const entity = await this.findNameOne(user.username);
    if (entity) {
      return resultCode({ message: '用户名已存在', code: Code.API_ERROR });
    }
    const list = await this.userRepository.insert(user);
    if (list) {
      return resultCode();
    }
    return resultCode({ message: '新增失败', code: Code.API_ERROR });
  }

  async update(name: string, updateDto) {
    const entity = await this.findNameOne(name);
    const updateEntity = this.userRepository.merge(entity, updateDto);
    return this.userRepository.save(updateEntity);
  }
}
