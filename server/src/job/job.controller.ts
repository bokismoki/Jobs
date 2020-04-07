import { Controller, Get, Param, Post, Res, UseInterceptors, UploadedFile, Body, ValidationPipe, Delete, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { JobService } from './job.service';
import { Job } from './job.entity';
import { editFileName, imageFileFilter } from 'src/utils/image-uploading.utils';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobsPaginationDto } from './dto/get-jobs-pagination.dto'

@Controller('job')
export class JobController {
    constructor(private jobService: JobService) { }

    @Get('admin')
    async getJobs(): Promise<Job[]> {
        return this.jobService.getJobs()
    }

    @Get()
    async getApprovedJobs(
        @Query(ValidationPipe) getJobsPaginationDto: GetJobsPaginationDto
    ): Promise<Job[]> {
        return this.jobService.getApprovedJobs(getJobsPaginationDto)
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName
        }),
        fileFilter: imageFileFilter
    }))
    async createJob(@UploadedFile() file,
        @Body(ValidationPipe) createJobDto: CreateJobDto): Promise<void> {
        return this.jobService.createJob(file, createJobDto)
    }

    @Patch(':id/approve')
    async approveJob(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.jobService.approveJob(id)
    }

    @Delete(':id')
    async deleteJob(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.jobService.deleteJob(id)
    }
}
