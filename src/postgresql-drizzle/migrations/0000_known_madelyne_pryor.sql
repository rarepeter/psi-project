DO $$ BEGIN
 CREATE TYPE "public"."statut_plata_rezervare" AS ENUM('in_asteptare', 'platit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "check_ins" (
	"id" serial PRIMARY KEY NOT NULL,
	"nume" varchar(255) NOT NULL,
	"prenume" varchar(255) NOT NULL,
	"adresa" varchar(255) NOT NULL,
	"localitate" varchar(255) NOT NULL,
	"data_nasterii" date NOT NULL,
	"check_in_date" date NOT NULL,
	"cetatenie" varchar(255) NOT NULL,
	"tip_act_identitate" varchar(255) NOT NULL,
	"nr_act_identitate" varchar(255) NOT NULL,
	"id_angajat" serial NOT NULL,
	"id_linie_rezervare" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bonuri_fiscale" (
	"id" serial PRIMARY KEY NOT NULL,
	"data_emitere" date DEFAULT now() NOT NULL,
	"total_bon_fiscal" integer NOT NULL,
	"id_rezervare" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clienti" (
	"id" serial PRIMARY KEY NOT NULL,
	"nr_telefon" varchar(255),
	"email" varchar(255),
	"localitate" varchar(255),
	"adresa" varchar(255) NOT NULL,
	"judet" varchar(255) NOT NULL,
	"nume" varchar(255),
	"prenume" varchar(255),
	"cnp" varchar(255),
	"serie_si_nr_document" varchar(255),
	"cui" varchar(255),
	"denumire_firma" varchar(255),
	"nr_reg_comert" varchar(255),
	CONSTRAINT "clienti_nr_telefon_unique" UNIQUE("nr_telefon"),
	CONSTRAINT "clienti_email_unique" UNIQUE("email"),
	CONSTRAINT "clienti_cnp_unique" UNIQUE("cnp"),
	CONSTRAINT "clienti_cui_unique" UNIQUE("cui"),
	CONSTRAINT "clienti_nr_reg_comert_unique" UNIQUE("nr_reg_comert")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facturi" (
	"id" serial PRIMARY KEY NOT NULL,
	"data_emitere" date DEFAULT now() NOT NULL,
	"data_scadenta" date NOT NULL,
	"total_factura" integer NOT NULL,
	"id_rezervare" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linii_rezervari" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_rezervare" serial NOT NULL,
	"check_in_date" date NOT NULL,
	"check_out_date" date NOT NULL,
	"nr_persoane" smallint NOT NULL,
	"nr_persoane_mic_dejun" smallint NOT NULL,
	"id_camera" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rezervari" (
	"id" serial PRIMARY KEY NOT NULL,
	"observatii" text,
	"data_intocmire" date,
	"statut_plata" "statut_plata_rezervare",
	"id_client" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "camere" (
	"id" serial PRIMARY KEY NOT NULL,
	"etaj" smallint NOT NULL,
	"id_tip_camera" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tipuri_camere" (
	"id" serial PRIMARY KEY NOT NULL,
	"denumire" varchar(255) NOT NULL,
	"nr_max_persoane" smallint NOT NULL,
	"tarif_per_noapte" smallint NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_id_linie_rezervare_linii_rezervari_id_fk" FOREIGN KEY ("id_linie_rezervare") REFERENCES "public"."linii_rezervari"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bonuri_fiscale" ADD CONSTRAINT "bonuri_fiscale_id_rezervare_rezervari_id_fk" FOREIGN KEY ("id_rezervare") REFERENCES "public"."rezervari"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facturi" ADD CONSTRAINT "facturi_id_rezervare_rezervari_id_fk" FOREIGN KEY ("id_rezervare") REFERENCES "public"."rezervari"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "linii_rezervari" ADD CONSTRAINT "linii_rezervari_id_rezervare_rezervari_id_fk" FOREIGN KEY ("id_rezervare") REFERENCES "public"."rezervari"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "linii_rezervari" ADD CONSTRAINT "linii_rezervari_id_camera_camere_id_fk" FOREIGN KEY ("id_camera") REFERENCES "public"."camere"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rezervari" ADD CONSTRAINT "rezervari_id_client_clienti_id_fk" FOREIGN KEY ("id_client") REFERENCES "public"."clienti"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "camere" ADD CONSTRAINT "camere_id_tip_camera_tipuri_camere_id_fk" FOREIGN KEY ("id_tip_camera") REFERENCES "public"."tipuri_camere"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
