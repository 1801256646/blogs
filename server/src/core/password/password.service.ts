import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormHelperService } from '@/common/typeorm-helper/typeorm-helper.service';
import { Password } from './entity/password.entity';
import { CreatePassword, UpdateDto } from './password.interface';

@Injectable()
export class PasswordService extends TypeormHelperService<Password> {
  constructor(
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>,
  ) {
    super(passwordRepository);
  }

  async findOne(username: string) {
    const passwordEntity = await this.passwordRepository.findOne({
      where: {
        username,
      },
    });
    return passwordEntity;
  }

  async add(dto: CreatePassword) {
    const { username, password } = dto;
    await this.passwordRepository.insert({
      username,
      password,
    });
  }

  async update(username: string, updateDto: UpdateDto) {
    const entity = await this.findOne(username);
    const updateEntity = this.passwordRepository.merge(entity, updateDto);
    return this.passwordRepository.save(updateEntity);
  }
}
