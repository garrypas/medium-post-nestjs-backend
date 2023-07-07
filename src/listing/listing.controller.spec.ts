import { EnvModule } from '@app/env/env.module';
import { Test, TestingModule } from '@nestjs/testing';
import { ListingController } from '@app/listing/listing.controller';
import { ListingService } from '@app/listing/listing.service';
import { ListingBase, Listing } from './listing.types';
import { ListingEntity } from './listing.entity';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

const listing1 = {
  id: 'D3723C12-FA72-403C-974C-5282B89B2203',
  name: 'Lotus Exige with dent on wing',
  description: `My Lotus has a big dent on the wing. Can someone give me an estimate please?`,
  agreedToTermsAndConditions: true,
  travelOptionId: 'travel-only',
  createdBy: 'Garry',
};

describe('listing.controller tests', () => {
  let listingController: ListingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ListingController],
      providers: [
        ListingService,
        {
          provide: 'LISTING_REPOSITORY',
          useFactory: () => ({
            find: async () => [listing1],
            create: async (listing: ListingBase) => ({
              ...listing,
              id: 'FE7862C1-CBEB-45E3-A538-787956E1C026',
            }),
            save: async (entity: ListingEntity) => entity,
            update: async (entity: ListingEntity) => ({
              affected:
                entity.id === '00000000-0000-0000-0000-000000000000' ? 0 : 1,
            }),
            findOne: async () => ({
              createdBy: 'garry',
            }),
          }),
        },
      ],
      imports: [EnvModule],
    }).compile();

    listingController = app.get<ListingController>(ListingController);
  });

  describe('/', () => {
    it('should get listings', async () => {
      const listings = await listingController.getListing();
      expect(listings).toEqual([listing1]);
    });

    it('should create a listing', async () => {
      const listing: ListingBase = {
        createdBy: 'garry',
        name: 'My listing',
        description: 'bla',
        travelOptionId: 'any',
        agreedToTermsAndConditions: true,
      };
      const result = await listingController.createListing(listing);
      expect(result.id).toMatch(/.+/);
    });

    it('should update a listing', async () => {
      const listing: Listing = {
        id: uuid(),
        createdBy: 'garry',
        name: 'My listing',
        description: 'bla',
        travelOptionId: 'any',
        agreedToTermsAndConditions: true,
      };
      const result = await listingController.updateListing(listing, {
        userId: 'garry',
      });
      expect(result).toEqual(listing);
    });

    it('should throw bad request exception if update fails', () => {
      const listing: Listing = {
        id: '00000000-0000-0000-0000-000000000000',
        createdBy: 'garry',
        name: 'My listing',
        description: 'bla',
        travelOptionId: 'any',
        agreedToTermsAndConditions: true,
      };
      expect(
        listingController.updateListing(listing, {
          userId: 'garry',
        }),
      ).rejects.toThrowError(BadRequestException);
    });
  });
});
