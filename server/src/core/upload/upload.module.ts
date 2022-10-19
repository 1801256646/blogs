import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 路径
        destination: './public/uploads',
        filename: (_, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = `${Date.now() + extname(file.originalname)}`;
          return cb(null, filename);
        },
      }),
    }),
    ConfigModule,
  ],
  controllers: [UploadController],
  providers: [UploadController],
})
export class UploadModule {}
