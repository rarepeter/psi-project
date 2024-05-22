import { CreateClientDto } from '../dto/client.dto';
import { Client } from '../interface/client.interface';

export abstract class ClientAbstractRepository {
  abstract createClient(createClientDto: CreateClientDto): Promise<Client>;
  abstract getClient(clientId: Client['idClient']): Promise<Client>;
  abstract updateClient(clientId: Client['idClient']): Promise<Client>;
  abstract deleteClient(clientId: Client['idClient']): Promise<Client>;
}
