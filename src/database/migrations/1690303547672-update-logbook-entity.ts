import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLogbookEntity1690303547672 implements MigrationInterface {
  name = 'UpdateLogbookEntity1690303547672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logbooks" ADD "confirmed_description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logbooks" DROP COLUMN "confirmed_description"`,
    );
  }
}
