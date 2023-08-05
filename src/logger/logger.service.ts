import { Inject, Injectable, Logger } from "@nestjs/common";
import { LoggerRepository } from './logger.repositoty';

@Injectable()
export class LoggerService extends Logger {
  constructor(
    @Inject(LoggerRepository)
    private readonly loggerRepository: LoggerRepository,
    private readonly _context?: string,
  ) {
    super(_context);
    this.context = _context;
  }
  public setName(name: string): void {
    this.context = name;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  public logInfo(entries: any, message: string, callback?: Function) {
    Logger.log(JSON.stringify(message, null, 2), this.context || this._context);
    this.loggerRepository
      .logInfo(JSON.stringify(entries), message, this.context, callback)
      .catch((e) => console.log(e));
  }
  public error(
    entries: any,
    message: string,
    trace?: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    callback?: Function,
  ) {
    Logger.error(
      JSON.stringify(message, null, 2),
      trace,
      this.context || this._context,
    );
    this.loggerRepository
      .error(JSON.stringify(entries), message, trace, this.context, callback)
      .catch((e) => console.log(e));
  }
}
