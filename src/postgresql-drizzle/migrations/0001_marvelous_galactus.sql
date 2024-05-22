ALTER TABLE "linii_rezervari" DROP CONSTRAINT "linii_rezervari_id_rezervare_rezervari_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "linii_rezervari" ADD CONSTRAINT "linii_rezervari_id_rezervare_rezervari_id_fk" FOREIGN KEY ("id_rezervare") REFERENCES "public"."rezervari"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
