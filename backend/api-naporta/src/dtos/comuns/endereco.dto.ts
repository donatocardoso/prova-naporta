import { ApiProperty } from '@nestjs/swagger';

export class EnderecoDto {
  @ApiProperty()
  cep: number;

  @ApiProperty()
  logradouro: string;

  @ApiProperty()
  numero: string;

  @ApiProperty()
  complemento: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  cidade: string;
}
