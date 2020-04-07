import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRepository } from './job.repository';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobsPaginationDto } from './dto/get-jobs-pagination.dto';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobRepository)
        private jobRepository: JobRepository
    ) { }

    async getJobs(): Promise<Job[]> {
        const jobs = await this.jobRepository.getJobs()
        return jobs
    }

    async getApprovedJobs(getJobsPaginationDto: GetJobsPaginationDto): Promise<Job[]> {
        const jobs = await this.jobRepository.getApprovedJobs(getJobsPaginationDto)
        return jobs
    }

    async getJob(id: number): Promise<Job> {
        return await this.jobRepository.findOne({ id })
    }

    async createJob(file, createJobDto: CreateJobDto): Promise<void> {
        return this.jobRepository.createJob(file, createJobDto)
    }

    async approveJob(id: number): Promise<void> {
        const job = await this.getJob(id)
        job.approved = true
        await job.save()
    }

    async deleteJob(id: number): Promise<void> {
        const result = await this.jobRepository.delete({ id })

        if (!result.affected) {
            throw new NotFoundException('Job post could not be deleted')
        }
    }
}
