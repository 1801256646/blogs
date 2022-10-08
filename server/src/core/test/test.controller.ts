import { Controller, Get, Query } from '@nestjs/common';

@Controller('test')
export class TestController {
  //   constructor(){};

  @Get('/')
  testGet(@Query() query: any) {
    return query;
  }
}
