import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDeviceTypeUnique1692347612426 implements MigrationInterface {
  name = 'UpdateDeviceTypeUnique1692347612426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device_types" ADD CONSTRAINT "UQ_5a7039baac8b071dad7ad8d4a93" UNIQUE ("type")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device_types" DROP CONSTRAINT "UQ_5a7039baac8b071dad7ad8d4a93"`,
    );
  }
}
