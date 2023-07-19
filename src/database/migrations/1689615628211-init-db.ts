import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1689615628211 implements MigrationInterface {
    name = 'InitDb1689615628211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "name" character varying NOT NULL, "gender" integer NOT NULL, "birthday" character varying NOT NULL, "address" character varying NOT NULL, "avatar" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_status" ("id" SERIAL NOT NULL, "status" character varying(50) NOT NULL, CONSTRAINT "PK_3924a3d59d98b717232f8f94935" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_type" ("id" SERIAL NOT NULL, "type" character varying(255) NOT NULL, CONSTRAINT "PK_f8d1c0daa8abde339c1056535a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "devices" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "staff_id" integer NOT NULL, "status_id" integer NOT NULL, "type_id" integer NOT NULL, "purchase_location" character varying(255) NOT NULL, "purchase_date" character varying(10) NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "maintenance_type" ("id" SERIAL NOT NULL, "type" character varying(255) NOT NULL, CONSTRAINT "PK_e51bdd8724eb1eb9c90a3bde646" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "maintenances" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "type_id" integer NOT NULL, "staff_id" integer NOT NULL, "device_id" integer NOT NULL, "description" character varying(255) NOT NULL, "status" character varying(50) NOT NULL, "confirmed" boolean NOT NULL, CONSTRAINT "PK_62403473bd524a42d58589aa78b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_disposal_proposal" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "device_id" integer NOT NULL, "reason" character varying(255) NOT NULL, "proposed_by" integer NOT NULL, "approved" boolean NOT NULL, CONSTRAINT "PK_0c5fb5ae43f89284600fbd8f91a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_b1514758245c12daf43486dd1f0" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_17537a50e31afd635d8919f1f7d" FOREIGN KEY ("status_id") REFERENCES "device_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_c665d68efb4fbcc11808cdd850c" FOREIGN KEY ("type_id") REFERENCES "device_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD CONSTRAINT "FK_62403473bd524a42d58589aa78b" FOREIGN KEY ("id") REFERENCES "maintenance_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD CONSTRAINT "FK_62403473bd524a42d58589aa78b" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD CONSTRAINT "FK_62403473bd524a42d58589aa78b" FOREIGN KEY ("id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "device_disposal_proposal" ADD CONSTRAINT "FK_0c5fb5ae43f89284600fbd8f91a" FOREIGN KEY ("id") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "device_disposal_proposal" ADD CONSTRAINT "FK_0c5fb5ae43f89284600fbd8f91a" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_disposal_proposal" DROP CONSTRAINT "FK_0c5fb5ae43f89284600fbd8f91a"`);
        await queryRunner.query(`ALTER TABLE "device_disposal_proposal" DROP CONSTRAINT "FK_0c5fb5ae43f89284600fbd8f91a"`);
        await queryRunner.query(`ALTER TABLE "maintenances" DROP CONSTRAINT "FK_62403473bd524a42d58589aa78b"`);
        await queryRunner.query(`ALTER TABLE "maintenances" DROP CONSTRAINT "FK_62403473bd524a42d58589aa78b"`);
        await queryRunner.query(`ALTER TABLE "maintenances" DROP CONSTRAINT "FK_62403473bd524a42d58589aa78b"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_c665d68efb4fbcc11808cdd850c"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_17537a50e31afd635d8919f1f7d"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_b1514758245c12daf43486dd1f0"`);
        await queryRunner.query(`DROP TABLE "device_disposal_proposal"`);
        await queryRunner.query(`DROP TABLE "maintenances"`);
        await queryRunner.query(`DROP TABLE "maintenance_type"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TABLE "device_type"`);
        await queryRunner.query(`DROP TABLE "device_status"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
