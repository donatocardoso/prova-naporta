import { ApiProperty } from '@nestjs/swagger';
import { ClienteDto } from '../comuns/cliente.dto';
import { EnderecoDto } from '../comuns/endereco.dto';
import { ItemDto } from '../comuns/item.dto';

export class FiltrarPedidoDto {
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
