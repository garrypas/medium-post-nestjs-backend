import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const LISTING = 'listing';
const TRAVEL_OPTIONS = 'travelOptions';

export class Migration1688586791849 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: LISTING,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(512)',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'agreedToTermsAndConditions',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'travelOptionId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'varchar(512)',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: TRAVEL_OPTIONS,
        columns: [
          {
            name: 'id',
            type: 'varchar(512)',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(512)',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      LISTING,
      new TableForeignKey({
        columnNames: ['travelOptionId'],
        referencedColumnNames: ['id'],
        referencedTableName: TRAVEL_OPTIONS,
      }),
    );
  }

  public async down(): Promise<void> {
    console.warn('Cannot undo this migration');
  }
}
