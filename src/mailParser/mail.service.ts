import { Injectable } from '@nestjs/common';
import * as imaps from 'imap-simple';
import { convert } from 'html-to-text';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailReaderType } from './ports/mail.reader.type';
import { UserService } from '../user/user.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MailService {
  constructor(
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {}
  connection: any;
  @Cron(CronExpression.EVERY_MINUTE)
  async read(): Promise<void> {
    try {
      await this.connect();
      const box = await this.connection.openBox('INBOX');
      const searchCriteria = ['UNSEEN'];
      const fetchOptions = {
        bodies: ['HEADER', 'TEXT'],
        markSeen: true,
      };
      const results: MailReaderType[] = await this.connection.search(
        searchCriteria,
        fetchOptions,
      );
      this.handleData(results);
    } catch (error) {
      console.log(error);
    }
  }
  private async connect(): Promise<void> {
    const READ_MAIL_CONFIG = {
      imap: {
        user: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        host: process.env.MAIL_HOST,
        port: 993,
        authTimeout: 10000,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
      },
    };
    this.connection = await imaps.connect(READ_MAIL_CONFIG);
    console.log('CONNECTION SUCCESSFUL', new Date().toString());
  }
  private handleData(results: MailReaderType[]): void {
    results.forEach((res) => {
      const text = res.parts.filter((part) => {
        return part.which === 'TEXT';
      });
      const emailHTML = text[0].body;
      const emailText = convert(emailHTML);
      const user = {
        name: 'ali',
        phone_no: '123456789',
        email: 'test@yepco.ir',
      };
      this.userService.create(user);
      console.log('result', emailText);
    });
    this.connection.end();
  }
}
