import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Approver } from './entity/approver.entity';

@Injectable()
export class ApproverService {
  constructor(
    @InjectRepository(Approver)
    private approverRepository: Repository<Approver>,
  ) {}

  async find() {
    return this.approverRepository.findOne({
      where: {
        id: 1,
      },
    });
  }

  async findAll() {
    return await this.approverRepository.find();
  }
}
