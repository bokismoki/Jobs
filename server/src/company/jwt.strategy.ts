import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './jwt-payload.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { CompanyRepository } from './company.repository'
import { Company } from './company.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: JwtPayload): Promise<Company> {
        const { id } = payload
        const company = await this.companyRepository.findOne({ id })

        if (!company) {
            throw new UnauthorizedException('Invalid credential')
        }

        return company
    }
}