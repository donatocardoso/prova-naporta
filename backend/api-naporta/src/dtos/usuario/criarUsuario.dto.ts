import { ApiProperty } from '@nestjs/swagger';

export class CriarUsuarioDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  senha: string;
}
