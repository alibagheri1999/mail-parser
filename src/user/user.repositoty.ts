import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILoggerRepository } from './ports/ILoggerRepository';
import LoggerEntity from './entity/logger.entity';

@Injectable()
export class LoggerRepository implements ILoggerRepository {
  constructor(
    @InjectRepository(LoggerEntity)
    private loggerRepository: Repository<LoggerEntity>,
  ) {}
  public async logInfo(
    entries: string,
    message: string,
    context?: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    callback?: Function,
  ): Promise<string> {
    return new Promise((resolve, _) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const entities = {
        entries,
        level: 'info',
        name: 'Success',
        message,
        context_name: context,
        trace: null,
      } as LoggerEntity;
      this.loggerRepository
        .create(entities)
        .save()
        .then((data) => {
          resolve(callback ? callback(JSON.stringify(data)) : '');
        })
        .catch((error) => {
          resolve(callback ? callback(JSON.stringify(error)) : '');
        });
    });
  }

  async error(
    entries: string,
    message: string,
    trace?: string,
    context?: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    callback?: Function,
  ): Promise<string> {
    return new Promise((resolve, _) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const entities = {
        entries,
        level: 'error',
        name: 'Fail',
        message,
        context_name: context,
        trace: trace ?? null,
      } as LoggerEntity;
      this.loggerRepository
        .create(entities)
        .save()
        .then((data) => {
          resolve(callback ? callback(JSON.stringify(data)) : '');
        })
        .catch((error) => {
          resolve(callback ? callback(JSON.stringify(error)) : '');
        });
    });
  }
}
