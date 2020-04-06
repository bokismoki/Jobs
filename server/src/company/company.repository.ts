import { EntityRepository, Repository } from "typeorm"
import { Company } from "./company.entity"
import { CreateCompanyDto } from "./dto/create-company.dto"
import * as bcrypt from 'bcrypt'
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common"
import { LoginDto } from "./dto/login.dto"
import { JwtPayload } from 'passport-jwt'
import { JwtService } from '@nestjs/jwt'

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
    async createCompany(createCompanyDto: CreateCompanyDto): Promise<void> {
        const { name, email, location, size, password } = createCompanyDto

        const company = new Company()
        company.name = name
        company.email = email
        company.location = location
        if (size) {
            company.size = size
        }
        company.password = await this.createHash(password)

        try {
            await company.save()
        } catch (err) {
            if (err.sqlState === '23000') {
                throw new ConflictException('Error bro')
            } else {
                throw new InternalServerErrorException('Error while registering a new account')
            }
        }
    }

    async validateUserPassword(loginDto: LoginDto): Promise<{ id: number, admin: boolean }> {
        const { email, password } = loginDto
        const user = await this.findOne({ email })

        if (user && await bcrypt.compare(password, user.password)) {
            return { id: user.id, admin: user.admin }
        } else {
            throw new UnauthorizedException('Invalid credentials')
        }
    }

    private async createHash(password) {
        return await bcrypt.hash(password, 10)
    }
}