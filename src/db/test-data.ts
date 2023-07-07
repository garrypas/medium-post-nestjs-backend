import logger from '../logger';
import { ListingEntity } from '../listing/listing.entity';
import * as db from './database.config';
import { DataSource } from 'typeorm';

const RETRY_DELAY = 1000;

const seed = async (dataSource: DataSource) => {
  const listingRepository = dataSource.getRepository(ListingEntity);
  await listingRepository.upsert(
    [
      {
        id: '82873DD0-59E5-4767-A75F-8FA1FE8E9E48',
        name: 'Vauxhall Astra',
        description: 'Dent on the bonnet. I work from home, any day is good for me.',
        agreedToTermsAndConditions: true,
        travelOptionId: 'travel-only',
        createdBy: 'Garry',
      },
      {
        id: 'D3723C12-FA72-403C-974C-5282B89B2203',
        name: 'Lotus Elise making lots of noise',
        description: `broken tail pipe, I'm in on weekends`,
        agreedToTermsAndConditions: true,
        travelOptionId: 'travel-only',
        createdBy: 'Garry',
      },
    ],
    ['id'],
  );
};

export default async () => {
  const dataSource = db.createDataSource({
    migrationsRun: false,
  });
  do {
    try {
      if (!dataSource.isInitialized) {
        await dataSource.initialize();
      }
      logger.log('Seeding test data');
      await seed(dataSource);
      break;
    } catch (err) {
      logger.warn(
        `Seeding failed. This might be because migrations are still being applied. Retrying in ${RETRY_DELAY} ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  } while (true);
  logger.log('Finished seeding test data');
  await dataSource.destroy();
};
