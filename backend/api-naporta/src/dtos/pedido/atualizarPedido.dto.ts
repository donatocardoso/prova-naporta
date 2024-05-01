import { ApiProperty } from '@nestjs/swagger';
import { ClienteDto } from '../comuns/cliente.dto';
import { EnderecoDto } from '../comuns/endereco.dto';
import { ItemDto } from '../comuns/item.dto';

export class AtualizarPedidoDto {
  @ApiProperty()
  dataPrevisaoEntrega: Date;

  @ApiProperty({ type: ClienteDto })
  cliente: ClienteDto;

  @ApiProperty({ type: EnderecoDto })
  enderecoEntrega: EnderecoDto;

  @ApiProperty({ type: [ItemDto] })
  items: ItemDto[];
}
