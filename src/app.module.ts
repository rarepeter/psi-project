import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresqlDrizzleModule } from './postgresql-drizzle/postgresql-drizzle.module';
import { ReservationModule } from './reservation/reservation.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [PostgresqlDrizzleModule, ReservationModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
