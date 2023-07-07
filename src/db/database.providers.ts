import { ConfigService } from '@nestjs/config';
import DbConfig from './database.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async () => {
      let dataSource = DbConfig;
      if (!dataSource.isInitialized) {
        dataSource = await dataSource.initialize();
      }
      return dataSource;
    },
  },
];
