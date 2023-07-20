/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Update1689872961141 implements MigrationInterface {
  name = 'Update1689872961141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_71a81ca29a26bb0d8310df4e83f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "liquidations_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "liquidations_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_71a81ca29a26bb0d8310df4e83f" FOREIGN KEY ("liquidations_id") REFERENCES "liquidations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
