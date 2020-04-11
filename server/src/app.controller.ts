import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('contact')
  @HttpCode(200)
  async sendEmail(@Body(ValidationPipe) sendEmailDto: SendEmailDto): Promise<void> {
    return this.appService.sendEmail(sendEmailDto)
  }
}
