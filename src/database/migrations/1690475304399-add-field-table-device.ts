import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldTableDevice1690475304399 implements MigrationInterface {
  name = 'AddFieldTableDevice1690475304399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "devices" ADD "is_confirm" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "is_confirm"`);
  }
}
