import { Module, HttpModule } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository]),
  ConfigModule.forRoot(),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '5h'
    }
  }),
    HttpModule],
  providers: [CompanyService, JwtStrategy],
  controllers: [CompanyController],
  exports: [JwtStrategy]
})
export class CompanyModule { }
