import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        ...(process.env.ENV
          ? [`.env-${process.env.ENV.toLowerCase()}.env`]
          : []),
      ],
    }),
  ],
})
export class EnvModule {}
