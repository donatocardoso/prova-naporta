import { ApiProperty } from '@nestjs/swagger';
import { ClienteDto } from './cliente.dto';
import { EnderecoDto } from './endereco.dto';
import { ItemDto } from './item.dto';

export class ProdutoDto {
  @ApiProperty()
  numeroPedido: number;

  @ApiProperty()
  dataPrevisaoEntrega: Date;

  @ApiProperty({ type: ClienteDto })
  cliente: ClienteDto;

  @ApiProperty({ type: EnderecoDto })
  enderecoEntrega: EnderecoDto;

  @ApiProperty({ type: ItemDto })
  item: ItemDto;

  @ApiProperty()
  dataCriacao: Date;
}
