import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@/core/core.module';
import { BusinessModule } from '@/business/business.module';
import { BasicModule } from '@/basic/basic.module';
import { global } from './config';
import databaseConfig from './config/database';

const { env } = process;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [global, databaseConfig],
      envFilePath: ['.env'],
    }),
    CoreModule,
    BusinessModule,
    BasicModule,
    TypeOrmModule.forRoot({
      username: env.DB_NAME,
      port: Number(env.DB_PORT),
      host: '120.78.142.48',
      password: env.DB_PASSWORD,
      type: 'mysql',
      database: env.DB_DATABASE,
      synchronize: false,
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
