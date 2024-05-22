import { Inject, Injectable } from '@nestjs/common';
import { ClientAbstractRepository } from './client.abstract';
import { Client } from '../interface/client.interface';
import { CreateClientDto } from '../dto/client.dto';
import { DRIZZLE_SQL_PROVIDER_NAME } from '../../postgresql-drizzle/postgresql-drizzle.module';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../postgresql-drizzle/schema';

@Injectable()
export class ClientRepository extends ClientAbstractRepository {
  constructor(
    @Inject(DRIZZLE_SQL_PROVIDER_NAME)
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {
    super();
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const createdClient = await this.db
      .insert(schema.clients)
      .values(createClientDto)
      .returning();

    return createdClient[0];
  }

  async getClient(clientId: Client['idClient']): Promise<Client> {
    throw new Error('Method not implemented.');
  }

  async updateClient(clientId: Client['idClient']): Promise<Client> {
    throw new Error('Method not implemented.');
  }

  async deleteClient(clientId: Client['idClient']): Promise<Client> {
    throw new Error('Method not implemented.');
  }
}
