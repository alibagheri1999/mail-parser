export interface ILoggerRepository {
  logInfo(entries: string, message: any, context?: string): Promise<string>;
  error(
    entries: string,
    message: any,
    trace?: string,
    context?: string,
  ): Promise<string>;
}
