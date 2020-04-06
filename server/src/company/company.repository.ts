import { EntityRepository, Repository } from "typeorm"
import { Company } from "./company.entity"
import { CreateCompanyDto } from "./dto/create-company.dto"
import * as bcrypt from 'bcrypt'
import { ConflictException, InternalServerErrorException } from "@nestjs/common"

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
            if(err.sqlState === '23000') {
                throw new ConflictException('Error bro')
            } else {
                throw new InternalServerErrorException()
            }
            console.log('ERRRRRR', err)
        }
    }

    private async createHash(password) {
        return await bcrypt.hash(password, 10)
    }
}