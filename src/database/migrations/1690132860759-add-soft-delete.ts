import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSoftDelete1690132860759 implements MigrationInterface {
  name = 'AddSoftDelete1690132860759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logbooks" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "liquidations" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "is_deleted"`);
    await queryRunner.query(
      `ALTER TABLE "liquidations" DROP COLUMN "is_deleted"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_deleted"`);
    await queryRunner.query(`ALTER TABLE "logbooks" DROP COLUMN "is_deleted"`);
  }
}
