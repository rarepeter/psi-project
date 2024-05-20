import {
  IsArray,
  IsDateString,
  IsIn,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Client } from '../../client/interface/client.interface';
import {
  Reservation,
  ReservationLine,
} from '../interface/reservation.interface';
import { allReservationPayStatuses } from '../../postgresql-drizzle/schema';
import { Type } from 'class-transformer';

const observatiiMaxLength = 2000;

export function IsLaterOrEqualToDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLaterOrEqualToDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value >= relatedValue
          );
        },
      },
    });
  };
}

export class CreateReservationDto implements Partial<Reservation> {
  @IsString()
  @MaxLength(observatiiMaxLength)
  observatii: string;

  @IsDateString()
  dataIntocmire: string;

  @IsString()
  @IsIn(allReservationPayStatuses)
  statutPlata: Reservation['statutPlata'];

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  idClient: Client['idClient'];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReservationLineDto)
  reservationLines: CreateReservationLineDto[];
}

export class CreateReservationLineDto implements Partial<ReservationLine> {
  @IsDateString()
  checkInDate: string;

  @IsDateString()
  @IsLaterOrEqualToDate('checkInDate')
  checkOutDate: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  nrPersoane: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  nrPersoaneMicDejun: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  idCamera: number;
}
