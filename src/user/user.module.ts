import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { UserRepository } from './user.repositoty';
import UserEntity from './entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
