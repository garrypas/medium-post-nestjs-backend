import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ListingEntity } from '@listing/listing.entity';
import { Listing, ListingBase } from '@listing/listing.types';
import { User } from '@app/user/user.types';

@Injectable()
export class ListingService {
  constructor(
    @Inject('LISTING_REPOSITORY')
    private listingRepository: Repository<ListingEntity>,
  ) {}

  async FindAll() {
    return this.listingRepository.find();
  }

  async create(listing: ListingBase) {
    const newEntity = this.listingRepository.create(listing);
    return await this.listingRepository.save(newEntity);
  }

  async update(listing: Listing, currentUser: User) {
    const current = await this.listingRepository.findOne({
      where: { id: listing.id },
    });
    if (current.createdBy !== currentUser.userId) {
      throw new ForbiddenException('User cannot update this listing.');
    }

    const result = await this.listingRepository.update(
      { id: listing.id },
      listing,
    );
    return result.affected === 1;
  }
}
