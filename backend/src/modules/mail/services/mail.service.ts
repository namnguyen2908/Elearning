import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  async sendEmail(to: string, subject: string, html: string) {
    // TODO: Implement with nodemailer when mail is configured
    console.log(`[MailService] Would send email to ${to}: ${subject}`);
  }
}
