import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import logger from '@app/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  await app.listen(3000);
}
bootstrap();
