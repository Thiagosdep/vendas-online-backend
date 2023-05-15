import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUserEmail1684139126833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      alter table public.users add unique(email);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
