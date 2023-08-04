import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly Logger: LoggerService) {
    this.Logger.setName(AppService.name);
  }
  getHealth(): string {
    this.Logger.logInfo(['just a parameter'], 'Check Health');
    return 'Check Health!!!';
  }
}
