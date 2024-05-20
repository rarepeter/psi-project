import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PostgresqlDrizzleModule } from '../postgresql-drizzle/postgresql-drizzle.module';
import { ClientRepository } from './repository/client.repository';

@Module({
  imports: [PostgresqlDrizzleModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
})
export class ClientModule {}
