import { Module } from '@nestjs/common';
import { ListingController } from '@listing/listing.controller';
import { ListingService } from '@listing/listing.service';
import { listingProviders } from '@listing/listing.providers';
import { DatabaseModule } from '@db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ListingController],
  providers: [...listingProviders, ListingService],
})
export class ListingModule {}
