import { DataSource } from 'typeorm';
import { ListingEntity } from './listing.entity';

export const listingProviders = [
  {
    provide: 'LISTING_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ListingEntity),
    inject: ['DATA_SOURCE'],
  },
];
