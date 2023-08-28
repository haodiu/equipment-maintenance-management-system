import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableUsers1693248799421 implements MigrationInterface {
  name = 'UpdateTableUsers1693248799421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "reset_password_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "reset_password_token"`,
    );
  }
}
