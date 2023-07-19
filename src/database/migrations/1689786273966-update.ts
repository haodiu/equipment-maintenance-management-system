/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Update1689786273966 implements MigrationInterface {
  name = 'Update1689786273966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "device_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_3924a3d59d98b717232f8f94935" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "device_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_f8d1c0daa8abde339c1056535a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "maintenance_type" ("id" SERIAL NOT NULL, "type" character varying(255) NOT NULL, CONSTRAINT "PK_e51bdd8724eb1eb9c90a3bde646" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "name" character varying NOT NULL, "gender" integer NOT NULL, "birthday" character varying NOT NULL, "address" character varying NOT NULL, "avatar" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "disposal_requests" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "reason" character varying, "approved" boolean NOT NULL DEFAULT false, "device_id" integer, "create_by" integer, CONSTRAINT "PK_411b9f912138ce11ddb41a21fb3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "devices" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying, "purchase_location" character varying, "purchase_date" character varying, "price" integer, "user_id" integer, "status_id" integer, "type_id" integer, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "maintenances" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "type_id" integer NOT NULL, "staff_id" integer NOT NULL, "device_id" integer NOT NULL, "description" character varying(255) NOT NULL, "status" character varying(50) NOT NULL, "confirmed" boolean NOT NULL, "user_id" integer, CONSTRAINT "PK_62403473bd524a42d58589aa78b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "disposal_requests" ADD CONSTRAINT "FK_c64f7aac8880094095e9bfb3626" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "disposal_requests" ADD CONSTRAINT "FK_e26c9c3bf58f8641a672e1364e3" FOREIGN KEY ("create_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" ADD CONSTRAINT "FK_5e9bee993b4ce35c3606cda194c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" ADD CONSTRAINT "FK_17537a50e31afd635d8919f1f7d" FOREIGN KEY ("status_id") REFERENCES "device_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" ADD CONSTRAINT "FK_c665d68efb4fbcc11808cdd850c" FOREIGN KEY ("type_id") REFERENCES "device_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "maintenances" ADD CONSTRAINT "FK_cd5b9ae21d19e4f15504682e9bb" FOREIGN KEY ("type_id") REFERENCES "maintenance_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "maintenances" ADD CONSTRAINT "FK_14a1a33db09c5f0aaf2503ef9d4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "maintenances" ADD CONSTRAINT "FK_4241f3a8a21b671807522e193c3" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "maintenances" DROP CONSTRAINT "FK_4241f3a8a21b671807522e193c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "maintenances" DROP CONSTRAINT "FK_14a1a33db09c5f0aaf2503ef9d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "maintenances" DROP CONSTRAINT "FK_cd5b9ae21d19e4f15504682e9bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" DROP CONSTRAINT "FK_c665d68efb4fbcc11808cdd850c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" DROP CONSTRAINT "FK_17537a50e31afd635d8919f1f7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" DROP CONSTRAINT "FK_5e9bee993b4ce35c3606cda194c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "disposal_requests" DROP CONSTRAINT "FK_e26c9c3bf58f8641a672e1364e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "disposal_requests" DROP CONSTRAINT "FK_c64f7aac8880094095e9bfb3626"`,
    );
    await queryRunner.query(`DROP TABLE "maintenances"`);
    await queryRunner.query(`DROP TABLE "devices"`);
    await queryRunner.query(`DROP TABLE "disposal_requests"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "maintenance_type"`);
    await queryRunner.query(`DROP TABLE "device_type"`);
    await queryRunner.query(`DROP TABLE "device_status"`);
  }
}
