import { Controller, Get } from '@nestjs/common';
import { PingResponse } from '@health/health.types';
import logger from '@app/logger';

@Controller('health')
export class HealthController {
  @Get('/ping')
  getPing(): PingResponse {
    logger.verbose('Request to /ping received');
    return { status: 'OK' };
  }
}
