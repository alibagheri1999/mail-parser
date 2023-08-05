import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger.service';
import { LoggerRepository } from '../logger.repositoty';
import LoggerEntity from '../entity/logger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../db/postgress.module';

describe('Logger-Service', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        DatabaseModule,
        TypeOrmModule.forFeature([LoggerEntity]),
      ],
      providers: [LoggerService, LoggerRepository],
      exports: [LoggerService, LoggerRepository],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });
  jest.setTimeout(20000); // for poor connections

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a info log', async () => {
    service.setName('test');
    function log() {
      return new Promise((resolve, _) => {
        service.logInfo('entries', 'success', (data) => {
          resolve(JSON.parse(data));
        });
      });
    }
    expect(await log()).toEqual({
      level: expect.any(String),
      message: expect.any(String),
      trace: null,
      id: expect.any(Number),
      name: expect.any(String),
      create_date: expect.any(String),
      last_modified_date: expect.any(String),
      entries: expect.any(String),
      context_name: expect.any(String),
    });
  });

  it('should create a error log', async () => {
    service.setName('test');
    function error() {
      return new Promise((resolve, _) => {
        service.error('entries', 'fail', 'line 7', (data) => {
          resolve(JSON.parse(data));
        });
      });
    }
    expect(await error()).toEqual({
      level: expect.any(String),
      message: expect.any(String),
      trace: expect.any(String),
      id: expect.any(Number),
      name: expect.any(String),
      create_date: expect.any(String),
      last_modified_date: expect.any(String),
      entries: expect.any(String),
      context_name: expect.any(String),
    });
  });

  it('should not create a info log because of missing message', async () => {
    service.setName('test');
    function log() {
      return new Promise((resolve, _) => {
        service.logInfo('entries', null, (data) => {
          resolve(JSON.parse(data));
        });
      });
    }
    // shows this query went wrong
    expect(await log()).toHaveProperty('code');
    expect(await log()).toHaveProperty('detail');
  });

  it('should not create a error log because of missing message', async () => {
    service.setName('test');
    function error() {
      return new Promise((resolve, _) => {
        service.error('entries', null, 'line 7', (data) => {
          resolve(JSON.parse(data));
        });
      });
    }
    // shows this query went wrong
    expect(await error()).toHaveProperty('code');
    expect(await error()).toHaveProperty('detail');
  });
});
