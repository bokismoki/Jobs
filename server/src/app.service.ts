import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import * as nodemailer from 'nodemailer'
import * as mailGun from 'nodemailer-mailgun-transport'

@Injectable()
export class AppService {

    async sendEmail(sendEmailDto: SendEmailDto): Promise<void> {
        const { name, email, phone, message } = sendEmailDto

        const transporter = nodemailer.createTransport(mailGun({
            auth: {
                api_key: process.env.MAIL_API_KEY,
                domain: process.env.MAIL_DOMAIN
            }
        }))

        const mailOptions = {
            from: email,
            to: 'borisbosnjak084@gmail.com',
            subject: `JOBS - ${name} - Phone: ${phone ? phone : 'N/A'}`,
            text: message
        }

        await transporter.sendMail(mailOptions)
    }
}
