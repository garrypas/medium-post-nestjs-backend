import logger from '@app/logger';
import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ListingService } from '@app/listing/listing.service';
import { CognitoGuard } from '@app/user/user.guard';
import { Listing, ListingBase } from '@listing/listing.types';
import { CurrentUser } from '@app/user/current-user.decorator';
import { User } from '@user/user.types';

@Controller('/api/v1/listing')
@UseGuards(CognitoGuard)
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get('/')
  async getListing() {
    logger.verbose('GET /api/v1/listing');
    return this.listingService.FindAll();
  }

  @Post('/')
  async createListing(@Body() listing: ListingBase) {
    logger.verbose('POST /api/v1/listing');
    return this.listingService.create(listing);
  }

  @Put('/')
  async updateListing(
    @Body() listing: Listing,
    @CurrentUser() currentUser: User,
  ) {
    logger.verbose('PUT /api/v1/listing');
    const result = await this.listingService.update(listing, currentUser);
    if (!result) {
      throw new BadRequestException({
        message: `Failed to update listing with the id "${listing.id}".`,
      });
    }
    return listing;
  }
}
