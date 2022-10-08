import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@/core/core.module';
import { BusinessModule } from '@/business/business.module';
import { BasicModule } from '@/basic/basic.module';
import { global, databaseConfig } from './config';

const { username, host, password, database } = databaseConfig();
@Module({
  imports: [
    CoreModule,
    BusinessModule,
    BasicModule,
    TypeOrmModule.forRoot({
      username,
      port: 3306,
      host,
      password,
      type: 'mysql',
      database,
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [global],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
