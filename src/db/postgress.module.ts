import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOSTNAME') || 'localhost',
        port: configService.get<number>('POSTGRES_PORT'),
        username:
          configService.get<string>('POSTGRES_USERNAME') || 'alibagheri',
        password: configService.get<string>('POSTGRES_PASSWORD') || 'Abcd1234',
        database: configService.get<string>('POSTGRES_NAME') || 'postgres',
        synchronize:
          configService.get<string>('POSTGRES_SYNCHRONIZE') === 'true' || true,
        keepConnectionAlive: true,
        entities: [],
      }),
    }),
  ],
})
export class DatabaseModule {}
