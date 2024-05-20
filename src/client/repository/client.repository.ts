import { Injectable } from '@nestjs/common';
import { ClientAbstractRepository } from './client.abstract';
import { Client } from '../interface/client.interface';

@Injectable()
export class ClientRepository extends ClientAbstractRepository {
  constructor() {
    super();
  }

  async createClient(): Promise<Client> {
    throw new Error('Method not implemented.');
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
