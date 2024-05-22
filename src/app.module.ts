import { Module } from '@nestjs/common';
import { PostgresqlDrizzleModule } from './postgresql-drizzle/postgresql-drizzle.module';
import { ReservationModule } from './reservation/reservation.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [PostgresqlDrizzleModule, ReservationModule, ClientModule],
})
export class AppModule {}
