import {
  CreateReservationDto,
  ModifyReservationDto,
} from '../dto/reservation.dto';
import {
  Reservation,
  ReservationWithReservationLines,
} from '../interface/reservation.interface';

export abstract class ReservationAbstractRepository {
  abstract create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationWithReservationLines>;
  abstract get(
    idRezervare: Reservation['idRezervare'],
  ): Promise<ReservationWithReservationLines>;
  abstract update(
    idRezervare: Reservation['idRezervare'],
    modifyReservationDto: ModifyReservationDto,
  ): Promise<ReservationWithReservationLines>;
  abstract delete(
    idRezervare: Reservation['idRezervare'],
  ): Promise<ReservationWithReservationLines>;
}
