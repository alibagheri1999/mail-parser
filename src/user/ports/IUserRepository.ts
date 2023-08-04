/*eslint-disable*/
export interface ILoggerRepository {
  logInfo(
    entries: string,
    message: any,
    context?: string,
    callback?: Function,
  ): Promise<string>;
  error(
    entries: string,
    message: any,
    trace?: string,
    context?: string,
    callback?: Function,
  ): Promise<string>;
}
