import { relations } from 'drizzle-orm';
import { check } from 'drizzle-orm/mysql-core';
import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  smallint,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

const reservationsTableName = 'rezervari';
const reservationLinesTableName = 'linii_rezervari';
const clientsTableName = 'clienti';
const invoicesTableName = 'facturi';
const chequesTableName = 'bonuri_fiscale';
const roomsTableName = 'camere';
const roomsTypesTableName = 'tipuri_camere';
const checkInsTableName = 'check_ins';

export const allReservationPayStatuses = [
  'in_asteptare',
  'platit',
] as const satisfies [string, ...string[]];

export const reservationPayStatusEnum = pgEnum(
  'statut_plata_rezervare',
  allReservationPayStatuses,
);

export const checkIn = pgTable(checkInsTableName, {
  idCheckIn: serial('id').primaryKey(),
  nume: varchar('nume', { length: 255 }).notNull(),
  prenume: varchar('prenume', { length: 255 }).notNull(),
  adresa: varchar('adresa', { length: 255 }).notNull(),
  localitate: varchar('localitate', { length: 255 }).notNull(),
  dataNasterii: date('data_nasterii').notNull(),
  checkInDate: date('check_in_date').notNull(),
  cetatenie: varchar('cetatenie', { length: 255 }).notNull(),
  tipActIdentitate: varchar('tip_act_identitate', { length: 255 }).notNull(),
  nrActIdentitate: varchar('nr_act_identitate', { length: 255 }).notNull(),
  idAngajat: serial('id_angajat').notNull(),
  idLinieRezervare: serial('id_linie_rezervare').references(
    () => reservationLines.idLinieRezervare,
  ),
});

export const roomsTypes = pgTable(roomsTypesTableName, {
  idTip: serial('id').primaryKey(),
  denumire: varchar('denumire', { length: 255 }).notNull(),
  nrMaxPersoane: smallint('nr_max_persoane').notNull(),
  tarifPerNoapte: smallint('tarif_per_noapte').notNull(),
});

export const rooms = pgTable(roomsTableName, {
  idCamera: serial('id').primaryKey(),
  etaj: smallint('etaj').notNull(),
  idTipCamera: smallint('id_tip_camera').references(() => roomsTypes.idTip),
});

export const cheques = pgTable(chequesTableName, {
  idBonFiscal: serial('id').primaryKey(),
  dataEmitere: date('data_emitere').notNull().defaultNow(),
  totalBonFiscal: integer('total_bon_fiscal').notNull(),
  idRezervare: serial('id_rezervare').references(
    () => reservations.idRezervare,
  ),
});

export const invoices = pgTable(invoicesTableName, {
  idFactura: serial('id').primaryKey(),
  dataEmitere: date('data_emitere').notNull().defaultNow(),
  dataScadenta: date('data_scadenta').notNull(),
  totalFactura: integer('total_factura').notNull(),
  idRezervare: serial('id_rezervare').references(
    () => reservations.idRezervare,
  ),
});

export const reservations = pgTable(reservationsTableName, {
  idRezervare: serial('id').primaryKey(),
  observatii: text('observatii'),
  dataIntocmire: date('data_intocmire'),
  statutPlata: reservationPayStatusEnum('statut_plata'),
  idClient: serial('id_client').references(() => clients.idClient),
});

export const reservationLines = pgTable(reservationLinesTableName, {
  idLinieRezervare: serial('id').primaryKey(),
  idRezervare: serial('id_rezervare').references(
    () => reservations.idRezervare,
  ),
  checkInDate: date('check_in_date').notNull(),
  checkOutDate: date('check_out_date').notNull(),
  nrPersoane: smallint('nr_persoane').notNull(),
  nrPersoaneMicDejun: smallint('nr_persoane_mic_dejun').notNull(),
  idCamera: serial('id_camera').references(() => rooms.idCamera),
});

export const clients = pgTable(clientsTableName, {
  idClient: serial('id').primaryKey(),
  nrTelefon: varchar('nr_telefon', { length: 255 }).unique(),
  email: varchar('email', { length: 255 }).unique(),
  localitate: varchar('localitate', { length: 255 }),
  adresa: varchar('adresa', { length: 255 }).notNull(),
  judet: varchar('judet', { length: 255 }).notNull(),
  nume: varchar('nume', { length: 255 }),
  prenume: varchar('prenume', { length: 255 }),
  cnp: varchar('cnp', { length: 255 }).unique(),
  serieSiNrDocument: varchar('serie_si_nr_document', { length: 255 }),
  cui: varchar('cui', { length: 255 }).unique(),
  denumireFirma: varchar('denumire_firma', { length: 255 }),
  nrRegComert: varchar('nr_reg_comert', { length: 255 }).unique(),
});

export const reservationsRelations = relations(reservations, ({ many }) => ({
  reservationLines: many(reservationLines),
}));
