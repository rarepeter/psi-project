import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './repository/reservation.repository';
import { PostgresqlDrizzleModule } from '../postgresql-drizzle/postgresql-drizzle.module';

@Module({
  imports: [PostgresqlDrizzleModule],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
