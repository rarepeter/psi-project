import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/reservation.dto';
import { TransformToPlainObjectPipe } from '../utils/pipes';
import { constructResponseJson } from '../utils/responses';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(
    @Body(TransformToPlainObjectPipe)
    createReservationDto: CreateReservationDto,
  ) {
    const createdReservationWithReservationLines =
      await this.reservationService.create(createReservationDto);

    return constructResponseJson(createdReservationWithReservationLines);
  }
}
