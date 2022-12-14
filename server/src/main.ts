import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@/common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.useStaticAssets(join(__dirname, '../', 'public'), {
    prefix: '/public',
  });

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(config.get('global.port'), config.get('global.host'));
}
bootstrap();
