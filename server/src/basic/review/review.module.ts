import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/core/user/user.module';
import { ReleaseModule } from '@/basic/release/release.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './entity/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UserModule, ReleaseModule],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
