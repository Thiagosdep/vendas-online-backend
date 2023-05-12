import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableCity1675388992280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE public.cities (
                id integer NOT NULL,
                state_id integer NOT NULL,
                name character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                deleted_at timestamp without time zone,
                primary key (id),
                foreign key (state_id) references public.states(id)
            );
            CREATE SEQUENCE public.cities_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;
            ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            drop table public.cities;
        `);
  }
}
