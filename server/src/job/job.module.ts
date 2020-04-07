import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from './job.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository])],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule { }
