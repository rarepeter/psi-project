import { IsDateString } from 'class-validator';
import { IsLaterOrEqualToDate } from './reservation.dto';

export class CheckRoomsAvailabilityQueryDto {
  @IsDateString()
  checkInDate: string;

  @IsDateString()
  @IsLaterOrEqualToDate('checkInDate')
  checkOutDate: string;
}
