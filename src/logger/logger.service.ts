import { Injectable, Logger } from '@nestjs/common';
import { LoggerRepository } from './logger.repositoty';

@Injectable()
export class LoggerService extends Logger {
  constructor(
    private loggerRepository: LoggerRepository,
    private readonly _context?: string,
  ) {
    super(_context);
    this.context = _context;
  }
  public setName(name: string): void {
    this.context = name;
  }
  public logInfo(entries: any, message: string) {
    this.loggerRepository.logInfo(
      JSON.stringify(entries),
      message,
      this.context,
    );
    Logger.log(JSON.stringify(message, null, 2), this.context || this._context);
  }
  public error(entries: any, message: string, trace?: string) {
    this.loggerRepository.error(JSON.stringify(entries), message, this.context);
    Logger.error(
      JSON.stringify(message, null, 2),
      trace,
      this.context || this._context,
    );
  }
}
