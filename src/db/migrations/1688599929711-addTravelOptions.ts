import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1688599929711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into('travelOptions')
      .values([
        { id: 'any', name: 'Any' },
        { id: 'call-out-only', name: 'comes to me' },
        { id: 'travel-only', name: 'I go to them' },
      ])
      .orUpdate(['name'], ['id'])
      .execute();
  }

  public async down(): Promise<void> {
    console.warn('Cannot undo this migration');
  }
}
