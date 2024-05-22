import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/client.dto';
import { ClientRepository } from './repository/client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async createClient(createClientDto: CreateClientDto) {
    const createdClient =
      await this.clientRepository.createClient(createClientDto);

    return createdClient;
  }
}
