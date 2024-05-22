import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { constructResponseJson } from '../utils/responses';
import { TransformToPlainObjectPipe } from '../utils/pipes';
import { CreateClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async createClient(
    @Body(TransformToPlainObjectPipe) createClientDto: CreateClientDto,
  ) {
    const createdClient =
      await this.clientService.createClient(createClientDto);

    return constructResponseJson(createdClient);
  }
}
