import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Client } from '../interface/client.interface';

export class CreateClientDto
  implements
    Pick<
      Client,
      | 'adresa'
      | 'cnp'
      | 'cui'
      | 'denumireFirma'
      | 'email'
      | 'judet'
      | 'localitate'
      | 'nrRegComert'
      | 'nrTelefon'
      | 'nume'
      | 'prenume'
      | 'serieSiNrDocument'
    >
{
  @IsOptional()
  @IsPhoneNumber('RO')
  nrTelefon: string | null;

  @IsOptional()
  @IsEmail()
  email: string | null;

  @IsOptional()
  @IsString()
  localitate: string | null;

  @IsString()
  @MinLength(1)
  adresa: string;

  @IsString()
  @MinLength(1)
  judet: string;

  @IsOptional()
  @IsString()
  nume: string | null;

  @IsOptional()
  @IsString()
  prenume: string | null;

  @IsOptional()
  @IsString()
  cnp: string | null;

  @IsOptional()
  @IsString()
  serieSiNrDocument: string | null;

  @IsOptional()
  @IsString()
  cui: string | null;

  @IsOptional()
  @IsString()
  denumireFirma: string | null;

  @IsOptional()
  @IsString()
  nrRegComert: string | null;
}
