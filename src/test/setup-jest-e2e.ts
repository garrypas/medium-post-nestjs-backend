import '@env/env.module';
import dataSource from '@db/database.config';
import setupTestData from '@db/test-data';

jest.setTimeout(30000); // 30s

beforeAll(async () => {
  do {
    try {
      if (!dataSource.isInitialized) {
        await dataSource.initialize();
      }
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1s
    }
  } while (true);

  await setupTestData();
  // We've been able to connect, destroy the connection so the e2e tests can proceed
  await dataSource.destroy();
});

afterAll(async () => {
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
});
