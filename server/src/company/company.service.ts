import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from 'passport-jwt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository,
        private jwtService: JwtService
    ) { }

    async confirmEmail(token: string): Promise<void> {
        const company = await this.companyRepository.findOne({ confirmation_token: token })
        if (company && company.confirmed === false) {
            company.confirmed = true
            await company.save()
        } else {
            throw new BadRequestException()
        }
    }

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<void> {
        return this.companyRepository.createCompany(createCompanyDto)
    }

    async login(loginDto: LoginDto): Promise<{ jwtToken: string, id: number, admin: boolean }> {
        const { id, admin } = await this.companyRepository.validateCompanyPassword(loginDto)

        const payload: JwtPayload = { id, admin }
        const jwtToken = this.jwtService.sign(payload)

        return { jwtToken, id, admin }
    }
}
