import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';

@Controller('/upload')
export class UploadController {
  constructor(private configService: ConfigService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      //   storage: diskStorage({
      //     destination: (_, file, cb) => {
      //       console.log(file, 'des');
      //       cb(null, file.originalname);
      //     },
      //     filename: (_, file, cb) => {
      //       console.log(file, 'file');
      //       cb(null, file.originalname);
      //     },
      //   }),
    }),
  )
  async upload(@UploadedFile() file) {
    const port = this.configService.get('global.port');
    const host = this.configService.get('global.ip');
    file.url = `http://${port}:${host}/public/uploads/${file.filename}`;
    return file;
  }

  //   @UseInterceptors(FileInterceptor('file'))
  //   @Post()
  //   uploadFileAndFailValidation(
  //     @Body() body: { name: string },
  //     @UploadedFile(
  //       new ParseFilePipeBuilder()
  //         .addFileTypeValidator({
  //           fileType: 'png',
  //         })
  //         .build(),
  //     )
  //     file: Express.Multer.File,
  //   ) {
  //     console.log(body, file);
  //     const writeImage = createWriteStream(
  //       join(__dirname, '..', '../public/upload', `${file.originalname}`),
  //     );
  //     return {
  //       body,
  //       file: file.buffer.toString(),
  //     };
  //   }
}
