import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('/upload')
export class UploadController {
  constructor(private configService: ConfigService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    const port = this.configService.get('global.port');
    const host = this.configService.get('global.host');
    file.url = `http://${host}:${port}/public/uploads/${file.filename}`;
    return file;
  }
}
