import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { global } from './config';

const { common } = global();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(common.port, common.ip);
}
bootstrap();
