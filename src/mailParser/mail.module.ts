import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [ConfigModule],
  providers: [MailService, LoggerService, UserService],
  exports: [MailService],
  controllers: [],
})
export class MailModule {}
