import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableAddress1675388996374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE public.addresses (
                id integer NOT NULL,
                user_id integer NOT NULL,
                complement character varying,
                number integer NOT NULL,
                cep character varying NOT NULL,
                city_id integer NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                deleted_at timestamp without time zone,
                primary key (id),
                foreign key (user_id) references public.users(id),
                foreign key (city_id) references public.cities(id)
            );
            
            CREATE SEQUENCE public.addresses_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;
            
            ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            drop table public.addresses;
        `);
  }
}
