import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from 'config/db.connect.config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(typeOrmConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
