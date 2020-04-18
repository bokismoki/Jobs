import { Injectable, BadRequestException, HttpService, NotFoundException } from '@nestjs/common';
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
        private jwtService: JwtService,
        private httpService: HttpService
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

    async verifyRecaptcha(token: string): Promise<{ success: boolean }> {
        const response = await this.httpService.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).toPromise()
        return {
            success: response.data.success
        }
    }

    async deleteCompany(id: number): Promise<void> {
        const deletedCompany = await this.companyRepository.delete({ id })
        if (!deletedCompany.affected) {
            throw new NotFoundException('No company with this ID')
        }
    }
}
