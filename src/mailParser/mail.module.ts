import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../user/entity/User.entity';
import { UserModule } from '../user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from '../logger/logger.module';
import LoggerEntity from '../logger/entity/logger.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, LoggerEntity]),
    UserModule,
    ScheduleModule.forRoot(),
    LoggerModule,
  ],
  providers: [MailService, LoggerService, UserService],
  exports: [MailService],
  controllers: [],
})
export class MailModule {}
