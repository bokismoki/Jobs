import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRepository } from './job.repository';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobsPaginationDto } from './dto/get-jobs-pagination.dto';
import * as nodemailer from 'nodemailer'
import * as mailGun from 'nodemailer-mailgun-transport'

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

    async approveJob(id: number, email: string): Promise<void> {
        const job = await this.getJob(id)
        job.approved = true
        await job.save()

        this.sendEmail(email, 'approval')
    }

    async deleteJob(id: number, email: string): Promise<void> {
        const result = await this.jobRepository.delete({ id })

        if (!result.affected) {
            throw new NotFoundException('Job post could not be deleted')
        }

        this.sendEmail(email, 'deletion')
    }

    async sendEmail(email: string, purpose: string): Promise<void> {
        const transporter = nodemailer.createTransport(mailGun({
            auth: {
                api_key: process.env.MAIL_API_KEY,
                domain: process.env.MAIL_DOMAIN
            }
        }))

        if (purpose === 'approval') {
            var subject = '</Jobs> - Approved'
            var text = 'Hello, your job post has been approved.'
        } else if (purpose === 'deletion') {
            var subject = '</Jobs> - Not Approved'
            var text = 'Hello, your job post has not been approved.'
        }

        const mailOptions = {
            from: 'borisbosnjak084@gmail.com',
            to: email,
            subject,
            text
        }

        await transporter.sendMail(mailOptions)
    }
}