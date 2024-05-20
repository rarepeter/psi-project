import {
  Reservation,
  ReservationWithReservationLines,
} from '../interface/reservation.interface';
import { ReservationAbstractRepository } from './reservation.abstract';
import * as schema from '../../postgresql-drizzle/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_SQL_PROVIDER_NAME } from '../../postgresql-drizzle/postgresql-drizzle.module';
import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../dto/reservation.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class ReservationRepository extends ReservationAbstractRepository {
  constructor(
    @Inject(DRIZZLE_SQL_PROVIDER_NAME)
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {
    super();
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationWithReservationLines> {
    const reservationsWithReservationLines = await this.db.transaction(
      async (trx) => {
        const reservation = await trx
          .insert(schema.reservations)
          .values({
            idClient: createReservationDto.idClient,
            dataIntocmire: createReservationDto.dataIntocmire,
            observatii: createReservationDto.observatii,
            statutPlata: createReservationDto.statutPlata,
          })
          .returning();

        await trx.insert(schema.reservationLines).values(
          createReservationDto.reservationLines.map((reservationLine) => ({
            checkInDate: reservationLine.checkInDate,
            idRezervare: reservation[0].idRezervare,
            checkOutDate: reservationLine.checkOutDate,
            nrPersoane: reservationLine.nrPersoane,
            nrPersoaneMicDejun: reservationLine.nrPersoaneMicDejun,
          })),
        );

        const reservationsWithReservationLines =
          await this.db.query.reservations.findFirst({
            where: eq(
              schema.reservations.idRezervare,
              reservation[0].idRezervare,
            ),
            with: { reservationLines: true },
          });

        return reservationsWithReservationLines;
      },
    );

    return reservationsWithReservationLines;
  }

  async delete(
    idRezervare: Reservation['idRezervare'],
  ): Promise<ReservationWithReservationLines> {
    throw new Error('Method not implemented.');
  }

  async get(
    idRezervare: Reservation['idRezervare'],
  ): Promise<ReservationWithReservationLines> {
    throw new Error('Method not implemented.');
  }

  async update(
    idRezervare: Reservation['idRezervare'],
  ): Promise<ReservationWithReservationLines> {
    throw new Error('Method not implemented.');
  }
}
