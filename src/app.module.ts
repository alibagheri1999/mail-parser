import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { configValidationSchema } from './schema/env.validator';
import { DatabaseModule } from './db/postgress.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
