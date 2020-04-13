import { Controller, Get, Param, Post, Res, UseInterceptors, UploadedFile, Body, ValidationPipe, Delete, ParseIntPipe, Patch, Query, UseGuards, UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { JobService } from './job.service';
import { Job } from './job.entity';
import { editFileName, imageFileFilter } from 'src/utils/image-uploading.utils';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobsPaginationDto } from './dto/get-jobs-pagination.dto'
import { AuthGuard } from '@nestjs/passport';
import { GetCompany } from 'src/company/get-company.decorator';
import { Company } from 'src/company/company.entity';

@Controller('job')
export class JobController {
    constructor(private jobService: JobService) { }

    @Get('admin')
    @UseGuards(AuthGuard('jwt'))
    async getJobs(@GetCompany() company: Company): Promise<Job[]> {
        if (!company.admin) {
            throw new UnauthorizedException('Invalid credentials')
        }
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
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName
        }),
        fileFilter: imageFileFilter
    }))
    async createJob(
        @GetCompany() company: Company,
        @UploadedFile() file,
        @Body(ValidationPipe) createJobDto: CreateJobDto): Promise<void> {
        if (!company.admin) {
            throw new UnauthorizedException('Invalid credentials')
        }
        return this.jobService.createJob(file, createJobDto)
    }

    @Patch(':id/approve')
    @UseGuards(AuthGuard('jwt'))
    async approveJob(
        @GetCompany() company: Company,
        @Param('id', ParseIntPipe) id: number,
        @Body() dataObj: { email: string }): Promise<void> {
        if (!company.admin) {
            throw new UnauthorizedException('Invalid credentials')
        }
        return this.jobService.approveJob(id, dataObj.email)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteJob(
        @GetCompany() company: Company,
        @Param('id', ParseIntPipe) id: number,
        @Body() dataObj: { email: string }): Promise<void> {
        if (!company.admin) {
            throw new UnauthorizedException('Invalid credentials')
        }
        return this.jobService.deleteJob(id, dataObj.email)
    }
}
