import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewInterface } from './review.interface';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async get(@Query('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @Post()
  async review(@Body() body: ReviewInterface) {
    return this.reviewService.create(body);
  }
}
