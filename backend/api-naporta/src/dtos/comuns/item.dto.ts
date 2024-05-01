import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty()
  descricao: string;

  @ApiProperty()
  preco: number;
}
