import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtualizarPedidoDto } from 'src/dtos/pedido/atualizarPedido.dto';
import { CriarPedidoDto } from 'src/dtos/pedido/criarPedido.dto';
import { FiltrarPedidoDto } from 'src/dtos/pedido/filtrarPedido.dto';
import { PedidoService } from './pedido.service';

@ApiBearerAuth()
@ApiTags('pedido')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async buscarPedidos() {
    return await this.pedidoService.buscarPedidos();
  }

  @Get('filtrar')
  @ApiQuery({ type: FiltrarPedidoDto })
  async filtrarPedidos(@Query() pesquisa: FiltrarPedidoDto) {
    return await this.pedidoService.filtrarPedidos(pesquisa);
  }

  @Get(':id')
  async buscarPedidoPorId(@Param('id') id: string) {
    return await this.pedidoService.buscarPedidoPorId(id);
  }

  @Post()
  @ApiBody({ type: CriarPedidoDto })
  async criarPedido(@Body() dadosPedido: CriarPedidoDto) {
    return await this.pedidoService.criarPedido(dadosPedido);
  }

  @Put(':id')
  @ApiBody({ type: AtualizarPedidoDto })
  async atualizarPedido(
    @Param('id') id: string,
    @Body() dadosAtualizacao: AtualizarPedidoDto,
  ) {
    return await this.pedidoService.atualizarPedido(id, dadosAtualizacao);
  }

  @Delete(':id')
  async excluirPedido(@Param('id') id: string) {
    return await this.pedidoService.excluirPedido(id);
  }
}
