import {
  Reservation,
  ReservationWithReservationLines,
} from '../interface/reservation.interface';
import { ReservationAbstractRepository } from './reservation.abstract';
import * as schema from '../../postgresql-drizzle/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_SQL_PROVIDER_NAME } from '../../postgresql-drizzle/postgresql-drizzle.module';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreateReservationDto,
  ModifyReservationDto,
} from '../dto/reservation.dto';
import { and, count, eq, gte, lte, or, sql } from 'drizzle-orm';
import { CheckRoomsAvailabilityQueryDto } from '../dto/reservation-query.dto';

@Injectable()
export class ReservationRepository extends ReservationAbstractRepository {
  constructor(
    @Inject(DRIZZLE_SQL_PROVIDER_NAME)
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {
    super();
  }

  async checkAvailability(
    checkRoomsAvailabilityQueryDto: CheckRoomsAvailabilityQueryDto,
  ) {
    const allRoomTypesRoomsCount = await this.db
      .select({
        idTipCamera: schema.rooms.idTipCamera,
        camereValabile: count(),
      })
      .from(schema.rooms)
      .groupBy(schema.rooms.idTipCamera);

    const reservationsAvailability = await this.db
      .select({
        idTipCamera: schema.roomsTypes.idTip,
        camereOcupate: sql<number>`cast(count(distinct(${schema.reservationLines.idCamera})) as integer)`,
      })
      .from(schema.reservationLines)
      .innerJoin(
        schema.rooms,
        eq(schema.reservationLines.idCamera, schema.rooms.idCamera),
      )
      .innerJoin(
        schema.roomsTypes,
        eq(schema.rooms.idTipCamera, schema.roomsTypes.idTip),
      )
      .groupBy(schema.roomsTypes.idTip)
      .where(
        or(
          and(
            lte(
              schema.reservationLines.checkInDate,
              checkRoomsAvailabilityQueryDto.checkInDate,
            ),
            gte(
              schema.reservationLines.checkOutDate,
              checkRoomsAvailabilityQueryDto.checkInDate,
            ),
          ),
          and(
            lte(
              schema.reservationLines.checkInDate,
              checkRoomsAvailabilityQueryDto.checkOutDate,
            ),
            gte(
              schema.reservationLines.checkOutDate,
              checkRoomsAvailabilityQueryDto.checkOutDate,
            ),
          ),
          and(
            gte(
              schema.reservationLines.checkInDate,
              checkRoomsAvailabilityQueryDto.checkInDate,
            ),
            lte(
              schema.reservationLines.checkOutDate,
              checkRoomsAvailabilityQueryDto.checkOutDate,
            ),
          ),
        ),
      );

    const roomTypesAvailability = allRoomTypesRoomsCount.reduce(
      (prevObject, currRoomTypeCount) => {
        const roomTypeBusiness = reservationsAvailability.find(
          (reservationAvailability) =>
            reservationAvailability.idTipCamera ===
            currRoomTypeCount.idTipCamera,
        );

        if (roomTypeBusiness !== undefined) {
          return {
            ...prevObject,
            [currRoomTypeCount.idTipCamera!]:
              currRoomTypeCount.camereValabile - roomTypeBusiness.camereOcupate,
          };
        }

        return {
          ...prevObject,
          [currRoomTypeCount.idTipCamera!]: currRoomTypeCount.camereValabile,
        };
      },
      <Record<number, number>>{},
    );

    return roomTypesAvailability;
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationWithReservationLines> {
    const createdReservationWithReservationLines = await this.db.transaction(
      async (trx) => {
        const createdReservation = await trx
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
            idRezervare: createdReservation[0].idRezervare,
            checkOutDate: reservationLine.checkOutDate,
            nrPersoane: reservationLine.nrPersoane,
            nrPersoaneMicDejun: reservationLine.nrPersoaneMicDejun,
            idCamera: reservationLine.idCamera,
          })),
        );

        const reservationWithReservationLines =
          await trx.query.reservations.findFirst({
            where: eq(
              schema.reservations.idRezervare,
              createdReservation[0].idRezervare,
            ),
            with: { reservationLines: true },
          });

        return reservationWithReservationLines;
      },
    );

    if (createdReservationWithReservationLines === undefined) {
      throw new Error('Error creating reservation');
    }

    return createdReservationWithReservationLines;
  }

  async update(
    idRezervare: Reservation['idRezervare'],
    modifyReservationDto: ModifyReservationDto,
  ): Promise<ReservationWithReservationLines> {
    const updatedReservationWithReservationLines = await this.db.transaction(
      async (trx) => {
        await trx
          .update(schema.reservations)
          .set({
            idClient: modifyReservationDto.idClient,
            dataIntocmire: modifyReservationDto.dataIntocmire,
            observatii: modifyReservationDto.observatii,
            statutPlata: modifyReservationDto.statutPlata,
          })
          .where(eq(schema.reservations.idRezervare, idRezervare));

        await trx
          .delete(schema.reservationLines)
          .where(eq(schema.reservationLines.idRezervare, idRezervare));

        await trx.insert(schema.reservationLines).values(
          modifyReservationDto.reservationLines.map((reservationLine) => ({
            checkInDate: reservationLine.checkInDate,
            idRezervare: idRezervare,
            checkOutDate: reservationLine.checkOutDate,
            nrPersoane: reservationLine.nrPersoane,
            nrPersoaneMicDejun: reservationLine.nrPersoaneMicDejun,
            idCamera: reservationLine.idCamera,
          })),
        );

        const reservationWithReservationLines =
          await trx.query.reservations.findFirst({
            where: eq(schema.reservations.idRezervare, idRezervare),
            with: { reservationLines: true },
          });

        return reservationWithReservationLines;
      },
    );

    if (updatedReservationWithReservationLines === undefined) {
      throw new Error('Error updating reservation');
    }

    return updatedReservationWithReservationLines;
  }

  async get(
    idRezervare: Reservation['idRezervare'],
  ): Promise<ReservationWithReservationLines> {
    throw new Error('Method not implemented.');
  }

  async delete(
    idRezervare: Reservation['idRezervare'],
  ): Promise<ReservationWithReservationLines> {
    throw new Error('Method not implemented.');
  }
}
