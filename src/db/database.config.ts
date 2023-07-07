import { DataSource } from 'typeorm';

let dataSource = null;
export const createDataSource = (options: any = undefined) => {
  if (dataSource) {
    return dataSource;
  }
  dataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsRun: true,
    migrationsTransactionMode: 'each',
    ...options,
  });
  return dataSource;
};

export default createDataSource();
