import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLogbookTypeUnique1692347940041
  implements MigrationInterface
{
  name = 'UpdateLogbookTypeUnique1692347940041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logbook_types" ADD CONSTRAINT "UQ_a0f2b55b9bac46bb636eaaf901f" UNIQUE ("type")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logbook_types" DROP CONSTRAINT "UQ_a0f2b55b9bac46bb636eaaf901f"`,
    );
  }
}
