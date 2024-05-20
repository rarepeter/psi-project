import { Client } from '../interface/client.interface';

export abstract class ClientAbstractRepository {
  abstract createClient(): Promise<Client>;
  abstract getClient(clientId: Client['idClient']): Promise<Client>;
  abstract updateClient(clientId: Client['idClient']): Promise<Client>;
  abstract deleteClient(clientId: Client['idClient']): Promise<Client>;
}
