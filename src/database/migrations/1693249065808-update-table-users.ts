import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableUsers1693249065808 implements MigrationInterface {
  name = 'UpdateTableUsers1693249065808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "reset_password_token_expiration" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "reset_password_token_expiration"`,
    );
  }
}
