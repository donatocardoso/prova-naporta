import { ApiProperty } from '@nestjs/swagger';

export class ClienteDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  documento: string;
}
