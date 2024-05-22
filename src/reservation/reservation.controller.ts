import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
  ModifyReservationDto,
} from './dto/reservation.dto';
import { TransformToPlainObjectPipe } from '../utils/pipes';
import { constructResponseJson } from '../utils/responses';
import { CheckRoomsAvailabilityQueryDto } from './dto/reservation-query.dto';
import { Reservation } from './interface/reservation.interface';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('availability')
  async checkReservationAvailability(
    @Query(new ValidationPipe())
    checkRoomsAvailabilityQueryDto: CheckRoomsAvailabilityQueryDto,
  ) {
    const reservationsAvailability =
      await this.reservationService.checkAvailability(
        checkRoomsAvailabilityQueryDto,
      );

    return constructResponseJson(reservationsAvailability);
  }

  @Post()
  async createReservation(
    @Body(TransformToPlainObjectPipe)
    createReservationDto: CreateReservationDto,
  ) {
    const createdReservationWithReservationLines =
      await this.reservationService.create(createReservationDto);

    return constructResponseJson(createdReservationWithReservationLines);
  }

  @Patch(':idRezervare')
  async updateReservation(
    @Param('idRezervare', ParseIntPipe) idRezervare: Reservation['idRezervare'],
    @Body(TransformToPlainObjectPipe)
    modifyReservationDto: ModifyReservationDto,
  ) {
    const modifiedReservationWithReservationLines =
      await this.reservationService.update(idRezervare, modifyReservationDto);

    return constructResponseJson(modifiedReservationWithReservationLines);
  }
}
