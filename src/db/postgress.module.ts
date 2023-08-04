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
        host: configService.get('POSTGRES_HOSTNAME') || 'localhost',
        port: Number.parseInt(configService.get('POSTGRES_PORT')) || 5432,
        username: configService.get('POSTGRES_USERNAME') || 'alibagheri',
        password: configService.get('POSTGRES_PASSWORD') || 'Abcd1234',
        database: configService.get('POSTGRES_NAME') || 'postgres',
        synchronize:
          configService.get('POSTGRES_SYNCHRONIZE') === 'true' || true,
        keepConnectionAlive: true,
        entities: [],
      }),
    }),
  ],
})
export class DatabaseModule {}
