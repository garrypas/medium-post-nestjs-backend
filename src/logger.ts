import * as winston from 'winston';
import { LogLevel, LoggerService } from '@nestjs/common';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const VALID_LOG_LEVELS = ['debug', 'info', 'warn', 'error', 'verbose'];

class Logger implements LoggerService {
  consoleLogger: winston.Logger;
  constructor() {
    const logLevel = (process.env.LOG_LEVEL || 'info') as LogLevel;
    if (!VALID_LOG_LEVELS.includes(LOG_LEVEL)) {
      throw new Error(
        `"${LOG_LEVEL}" is not a valid log level. Use one of these values: ${VALID_LOG_LEVELS.map(
          (level) => `"${level}"`,
        ).join(',')}`,
      );
    }
    this.setLogLevels([logLevel]);
  }

  private getConsoleLogger() {
    if (!this.consoleLogger) {
      this.consoleLogger = winston.createLogger({
        level: LOG_LEVEL,
        transports: [new winston.transports.Console()],
      });
    }
    return this.consoleLogger;
  }

  private logMessage(
    level: 'debug' | 'info' | 'warn' | 'error' | 'verbose',
    message: string,
    data: any | undefined = undefined,
  ) {
    this.getConsoleLogger()[level](message, data);
  }

  log(message: any, ...optionalParams: any[]) {
    this.logMessage('info', message, optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logMessage('error', message, optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logMessage('warn', message, optionalParams);
  }
  debug(message: any, ...optionalParams: any[]) {
    this.logMessage('debug', message, optionalParams);
  }
  verbose(message: any, ...optionalParams: any[]) {
    this.logMessage('verbose', message, optionalParams);
  }
  setLogLevels(levels: LogLevel[]) {
    this.getConsoleLogger().level = levels[0];
  }
}

export default new Logger();
