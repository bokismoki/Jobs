import { EntityRepository, Repository } from "typeorm"
import { Company } from "./company.entity"
import { CreateCompanyDto } from "./dto/create-company.dto"
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import * as mailGun from 'nodemailer-mailgun-transport'
import { v4 as uuidv4 } from 'uuid';
import { ConflictException, InternalServerErrorException, UnauthorizedException, ForbiddenException } from "@nestjs/common"
import { LoginDto } from "./dto/login.dto"

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
    async createCompany(createCompanyDto: CreateCompanyDto): Promise<void> {
        const { name, email, site, location, size, password } = createCompanyDto

        const company = new Company()
        company.name = name
        company.email = email
        company.site = site
        company.location = location
        company.confirmation_token = uuidv4()
        if (size) {
            company.size = size
        }
        company.password = await this.createHash(password)

        try {
            await company.save()

            const transporter = nodemailer.createTransport(mailGun({
                auth: {
                    api_key: process.env.MAIL_API_KEY,
                    domain: process.env.MAIL_DOMAIN
                }
            }))

            const mailOptions = {
                from: 'borisbosnjak084@gmail.com',
                to: company.email,
                subject: '"</Jobs>" Account Activation',
                html: `<h1 style="text-align: center">Click to activate account</h1>
                       <a href="https://jobs-it-server.herokuapp.com/api/company/confirm/${company.confirmation_token}" target="_blank" style="text-decoration: none, font-weight: black, text-transform: uppercase">Activate</a>`
            }

            await transporter.sendMail(mailOptions)
        } catch (err) {
            if (err.sqlState === '23000') {
                throw new ConflictException('There is a company registered with your email already')
            } else {
                throw new InternalServerErrorException('Error while registering a new account')
            }
        }
    }

    async validateCompanyPassword(loginDto: LoginDto): Promise<{ id: number, admin: boolean }> {
        const { email, password } = loginDto
        const company = await this.findOne({ email })

        if (!company.confirmed) {
            throw new ForbiddenException('Please confirm your email to login')
        }

        if (company && await bcrypt.compare(password, company.password)) {
            return { id: company.id, admin: company.admin }
        } else {
            throw new UnauthorizedException('Invalid credentials')
        }
    }

    private async createHash(password) {
        return await bcrypt.hash(password, 10)
    }
}