import { Injectable } from '@nestjs/common';
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

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<void> {
        return this.companyRepository.createCompany(createCompanyDto)
    }

    async login(loginDto: LoginDto): Promise<{ jwtToken: string, id: number, admin: boolean }> {
        const { id, admin } = await this.companyRepository.validateUserPassword(loginDto)

        const payload: JwtPayload = { id, admin }
        const jwtToken = this.jwtService.sign(payload)

        return { jwtToken, id, admin }
    }
}
