import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { UserRepository } from './user.repositoty';
import UserEntity from './entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { LoggerService } from '../logger/logger.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerRepository } from '../logger/logger.repositoty';
import LoggerEntity from '../logger/entity/logger.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, LoggerEntity]),
    LoggerModule,
  ],
  providers: [UserService, UserRepository, LoggerService, LoggerRepository],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
