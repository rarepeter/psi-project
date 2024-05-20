import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './repository/reservation.repository';
import { CreateReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
    constructor(private readonly reservationRepository: ReservationRepository) {}

    async create(createReservationDto: CreateReservationDto) {
        return await this.reservationRepository.create(createReservationDto);
    }
}
