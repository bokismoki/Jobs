import { Controller, Post, Body, ValidationPipe, HttpCode, Get, Param, Redirect, UnauthorizedException, UseInterceptors, UploadedFile, Req, Delete, UseGuards, ParseIntPipe, UnsupportedMediaTypeException, InternalServerErrorException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCompany } from './get-company.decorator';
import { Company } from './company.entity';
import { editFileName, imageFileFilter } from 'src/utils/image-uploading.utils';
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Get('confirm/:token')
    @Redirect('https://jobs-it.herokuapp.com', 301)
    async confirmEmail(@Param('token') token: string): Promise<void> {
        return this.companyService.confirmEmail(token)
    }

    @Post('signup')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName
        }),
        fileFilter: imageFileFilter,
        limits: {
            files: 1,
            fieldSize: 1024 * 1024 * 2
        }
    }))
    async createCompany(
        @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
        @UploadedFile() file: any,
        @Req() req
    ): Promise<void> {
        if(!file) {
            throw new InternalServerErrorException(req.imageFileFilterException)
        }

        if (req.imageFileFilterException) {
            throw new UnsupportedMediaTypeException(req.imageFileFilterException)
        }

        return this.companyService.createCompany(createCompanyDto, file)
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ jwtToken: string, id: number, admin: boolean }> {
        return this.companyService.login(loginDto)
    }

    @Post('recaptcha')
    async verifyRecaptcha(@Body('token') token: string): Promise<{ success: boolean }> {
        return this.companyService.verifyRecaptcha(token)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteCompany(
        @Param('id', ParseIntPipe) id: number,
        @GetCompany() company: Company): Promise<void> {
        if (!company.admin) {
            throw new UnauthorizedException('Invalid credentials')
        }
        return this.companyService.deleteCompany(id)
    }
}
