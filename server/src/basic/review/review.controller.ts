import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewInterface } from './review.interface';
import { JwtGuard } from '@/core/auth/guard/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async get(@Query('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async review(@Body() body: ReviewInterface, @Request() req) {
    return this.reviewService.create(body, req.user.username);
  }
}
