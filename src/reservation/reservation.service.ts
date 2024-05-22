import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './repository/reservation.repository';
import {
  CreateReservationDto,
  ModifyReservationDto,
} from './dto/reservation.dto';
import { CheckRoomsAvailabilityQueryDto } from './dto/reservation-query.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async checkAvailability(
    checkRoomsAvailabilityQueryDto: CheckRoomsAvailabilityQueryDto,
  ) {
    const reservationsAvailability =
      await this.reservationRepository.checkAvailability(
        checkRoomsAvailabilityQueryDto,
      );

    return reservationsAvailability;
  }

  async create(createReservationDto: CreateReservationDto) {
    const createdReservationWithReservationLines =
      await this.reservationRepository.create(createReservationDto);

    return createdReservationWithReservationLines;
  }

  async update(
    idRezervare: number,
    modifyReservationDto: ModifyReservationDto,
  ) {
    const modifiedReservationWithReservationLines =
      await this.reservationRepository.update(
        idRezervare,
        modifyReservationDto,
      );

    return modifiedReservationWithReservationLines;
  }
}
