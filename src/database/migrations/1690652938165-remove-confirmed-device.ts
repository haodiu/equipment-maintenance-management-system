import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveConfirmedDevice1690652938165 implements MigrationInterface {
  name = 'RemoveConfirmedDevice1690652938165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "is_confirm"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "devices" ADD "is_confirm" boolean NOT NULL DEFAULT false`,
    );
  }
}
