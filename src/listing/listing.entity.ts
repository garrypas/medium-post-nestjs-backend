import { Entity, Column } from 'typeorm';
import { Listing } from '@listing/listing.types';

@Entity({ name: 'listing' })
export class ListingEntity implements Listing {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column({ length: 512 })
  name: string;

  @Column('text')
  description: string;

  @Column('boolean')
  agreedToTermsAndConditions: boolean;

  @Column('varchar')
  travelOptionId: string;

  @Column('varchar')
  createdBy: string;
}

@Entity({ name: 'travelOptions' })
export class ListingTravelOptionsEntity {
  @Column({ primary: true, type: 'varchar' })
  id: string;

  @Column({ length: 512 })
  name: string;
}
