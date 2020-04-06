import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginDto } from './dto/login.dto';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Post('signup')
    async createCompany(@Body(ValidationPipe) createCompanyDto: CreateCompanyDto): Promise<void> {
        return this.companyService.createCompany(createCompanyDto)
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ jwtToken: string, id: number, admin: boolean }> {
        return this.companyService.login(loginDto)
    }
}
