import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILoggerRepository } from './ports/ILoggerRepository';

@Injectable()
export class LoggerService implements ILoggerRepository {
  constructor(@InjectRepository("") private readonly loggerRepository: Repository<"">) {
  }
  public async log(message: any, context?: string): Promise<string> {
    return new Promise((resolve, reject)=> {
      resolve('done');
    });
  }
  public async info(message: any, context?: string): Promise<string> {
    return new Promise((resolve, reject)=> {
      resolve('done');
    });
  }
  public async warn(message: any, context?: string): Promise<string> {
    return new Promise((resolve, reject)=> {
      resolve('done');
    });
  }
  public async error(
    message: any,
    trace?: string,
    context?: string,
  ): Promise<string> {
    return new Promise((resolve, reject)=> {
      resolve('done');
    });
  }
}
