import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository]),
  JwtModule.register({
    secret: 'secret'
  })],
  providers: [CompanyService, JwtStrategy],
  controllers: [CompanyController],
  exports: [JwtStrategy]
})
export class CompanyModule { }
