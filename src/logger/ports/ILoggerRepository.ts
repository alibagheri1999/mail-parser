export interface ILoggerRepository {
  log(message: any, context?: string): Promise<string>;
  info(message: any, context?: string): Promise<string>;
  warn(message: any, context?: string): Promise<string>;
  error(message: any, trace?: string, context?: string): Promise<string>;
}
