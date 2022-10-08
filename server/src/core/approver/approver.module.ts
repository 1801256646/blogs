import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApproverService } from './approver.service';
import { Approver } from './entity/approver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Approver])],
  providers: [ApproverService],
  exports: [ApproverService],
})
export class ApproverModule {}
