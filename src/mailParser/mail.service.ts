import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { connect } from 'imap-simple';
import { convert } from 'html-to-text';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailReaderType } from './ports/mail.reader.type';
import { UserService } from '../user/user.service';
import { LoggerService } from '../logger/logger.service';
import { findPatterns } from './utilities/text.macher';
import { MacherType } from './ports/macher.type';
import { IMailParser } from './ports/IMailParser';

@Injectable()
export class MailService implements IMailParser {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(LoggerService)
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setName(MailService.name);
  }
  connection: any;
  @Cron(CronExpression.EVERY_SECOND)
  async read(): Promise<string> {
    try {
      // console.log('start cron job');
      await this.connectImap();
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
      await this.handleData(results);
      return 'Completed';
    } catch (error) {
      this.loggerService.error(
        'initiating cron job',
        error?.message?.toString(),
        error?.toString(),
      );
    }
  }
  private async connectImap(): Promise<void> {
    const READ_MAIL_CONFIG = {
      imap: {
        user: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        host: process.env.MAIL_HOST,
        port: 993,
        authTimeout: 20000,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
      },
    };
    // console.log('222222222');
    this.connection = await connect(READ_MAIL_CONFIG);
    // console.log('CONNECTION SUCCESSFUL', new Date().toString());
  }
  private async handleData(results: MailReaderType[]): Promise<void> {
    for (let i = 0; i < results.length; i++) {
      const res = results[i];
      const text = res.parts.filter((part) => {
        return part.which === 'TEXT';
      });
      const emailHTML = text[0].body;
      const emailText = convert(emailHTML);
      await this.recordData(emailText);
    }
    this.connection.end();
  }
  private async recordData(emailText: string): Promise<void> {
    const user: MacherType = findPatterns(emailText);
    const result = await this.userService.create(user);
    if (typeof result === 'string' || result instanceof Error) {
      this.loggerService.error(
        user,
        typeof result === 'string' ? result : result?.message?.toString(),
        result?.toString(),
      );
    } else {
      this.loggerService.logInfo(user, 'user added successfully');
    }
  }
}
