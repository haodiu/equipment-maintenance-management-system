/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1689872667999 implements MigrationInterface {
  name = 'InitDb1689872667999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "logbook_types" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_ce000ab1bb0ec80a34a7a5147b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "logbooks" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "description" character varying, "status" character varying NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "type_id" integer, "user_id" integer, "device_id" integer, CONSTRAINT "PK_41810dc7c290a5798ee70ef5cef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "citizen_id" character varying, "name" character varying, "gender" character varying, "birthday" character varying, "address" character varying, "avatar" character varying, "role" character varying NOT NULL, "liquidations_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_f8c94b602bb7ac6a86a2266a52b" UNIQUE ("citizen_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "liquidations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "reason" character varying NOT NULL, "approved" boolean NOT NULL DEFAULT false, "device_id" integer, "auth_id" integer, CONSTRAINT "PK_2beac231b5ead3f70f2f6347a08" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "devices" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying, "device_status" character varying, "purchase_location" character varying, "purchase_date" character varying, "price" integer, "user_id" integer, "type_id" integer, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "device_types" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_c22e8985afe8ffe3ee485e41af8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "logbooks" ADD CONSTRAINT "FK_64d6df9d7327d5b9da47c16586d" FOREIGN KEY ("type_id") REFERENCES "logbook_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logbooks" ADD CONSTRAINT "FK_9418dea397255892fc0dbde9ce4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logbooks" ADD CONSTRAINT "FK_c3f540977caf7cdb829b6aaf202" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_71a81ca29a26bb0d8310df4e83f" FOREIGN KEY ("liquidations_id") REFERENCES "liquidations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "liquidations" ADD CONSTRAINT "FK_6a01c1437225ed2153b3216090e" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "liquidations" ADD CONSTRAINT "FK_f45b767498766aa6b65b4e7411e" FOREIGN KEY ("auth_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" ADD CONSTRAINT "FK_5e9bee993b4ce35c3606cda194c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" ADD CONSTRAINT "FK_c665d68efb4fbcc11808cdd850c" FOREIGN KEY ("type_id") REFERENCES "device_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "devices" DROP CONSTRAINT "FK_c665d68efb4fbcc11808cdd850c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" DROP CONSTRAINT "FK_5e9bee993b4ce35c3606cda194c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "liquidations" DROP CONSTRAINT "FK_f45b767498766aa6b65b4e7411e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "liquidations" DROP CONSTRAINT "FK_6a01c1437225ed2153b3216090e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_71a81ca29a26bb0d8310df4e83f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "logbooks" DROP CONSTRAINT "FK_c3f540977caf7cdb829b6aaf202"`,
    );
    await queryRunner.query(
      `ALTER TABLE "logbooks" DROP CONSTRAINT "FK_9418dea397255892fc0dbde9ce4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "logbooks" DROP CONSTRAINT "FK_64d6df9d7327d5b9da47c16586d"`,
    );
    await queryRunner.query(`DROP TABLE "device_types"`);
    await queryRunner.query(`DROP TABLE "devices"`);
    await queryRunner.query(`DROP TABLE "liquidations"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "logbooks"`);
    await queryRunner.query(`DROP TABLE "logbook_types"`);
  }
}
