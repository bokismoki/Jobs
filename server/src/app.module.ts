import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from 'config/db.connect.config';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(typeOrmConfig()), CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
