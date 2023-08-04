import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { configValidationSchema } from './schema/env.validator';
import { DatabaseModule } from './db/postgress.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      expandVariables: true,
      validationSchema: configValidationSchema,
    }),
    ThrottlerModule.forRoot({
      ttl: 3600 * 12,
      limit: 10000,
    }),
    DatabaseModule,
    LoggerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, LoggerService],
})
export class AppModule {}
