import type { MigrationInterface, QueryRunner } from 'typeorm';

export class LogbooksUpdateField1692778903538 implements MigrationInterface {
  name = 'LogbooksUpdateField1692778903538';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logbooks" ADD "time_planed" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "logbooks" DROP COLUMN "time_planed"`);
  }
}
