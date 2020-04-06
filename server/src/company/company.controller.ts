import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Post('signup')
    async createCompany(@Body(ValidationPipe) createCompanyDto: CreateCompanyDto): Promise<void> {
        return this.companyService.createCompany(createCompanyDto)
    }
}
