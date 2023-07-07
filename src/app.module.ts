import { Module } from '@nestjs/common';
import { HealthModule } from '@health/health.module';
import { ListingModule } from '@app/listing/listing.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [DatabaseModule, HealthModule, ListingModule],
})
export class AppModule {}
