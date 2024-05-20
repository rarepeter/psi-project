import {
  reservationLines,
  reservations,
} from '../../postgresql-drizzle/schema';

export type Reservation = typeof reservations.$inferSelect;
export type ReservationLine = typeof reservationLines.$inferSelect;

export type ReservationWithReservationLines = Reservation & {
  reservationLines: ReservationLine[];
};
