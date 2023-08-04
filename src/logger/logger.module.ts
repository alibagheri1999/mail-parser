import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './logger.service';
import { LoggerRepository } from './logger.repositoty';
import LoggerEntity from './entity/logger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([LoggerEntity])],
  providers: [LoggerService, LoggerRepository],
  exports: [LoggerService, LoggerRepository],
})
export class LoggerModule {}
