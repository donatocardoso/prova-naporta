import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/app/jwt-auth.guard';
import { AtualizarPedidoDto } from 'src/dtos/pedido/atualizarPedido.dto';
import { CriarPedidoDto } from 'src/dtos/pedido/criarPedido.dto';
import { FiltrarPedidoDto } from 'src/dtos/pedido/filtrarPedido.dto';
import { PedidoService } from './pedido.service';

@ApiTags('pedido')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async buscarPedidos() {
    return await this.pedidoService.buscarPedidos();
  }

  @Get('filtrar')
  @ApiQuery({ type: FiltrarPedidoDto })
  @UseGuards(JwtAuthGuard)
  async filtrarPedidos(@Query() pesquisa: FiltrarPedidoDto) {
    return await this.pedidoService.filtrarPedidos(pesquisa);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async buscarPedidoPorId(@Param('id') id: string) {
    return await this.pedidoService.buscarPedidoPorId(id);
  }

  @Post()
  @ApiBody({ type: CriarPedidoDto })
  @UseGuards(JwtAuthGuard)
  async criarPedido(@Body() dadosPedido: CriarPedidoDto) {
    return await this.pedidoService.criarPedido(dadosPedido);
  }

  @Put(':id')
  @ApiBody({ type: AtualizarPedidoDto })
  @UseGuards(JwtAuthGuard)
  async atualizarPedido(
    @Param('id') id: string,
    @Body() dadosAtualizacao: AtualizarPedidoDto,
  ) {
    return await this.pedidoService.atualizarPedido(id, dadosAtualizacao);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async excluirPedido(@Param('id') id: string) {
    return await this.pedidoService.excluirPedido(id);
  }
}
