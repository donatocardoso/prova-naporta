import { Injectable } from '@nestjs/common';
import { Pedido } from '@prisma/client';
import { AtualizarPedidoDto } from 'src/dtos/pedido/atualizarPedido.dto';
import { CriarPedidoDto } from 'src/dtos/pedido/criarPedido.dto';
import { FiltrarPedidoDto } from 'src/dtos/pedido/filtrarPedido.dto';
import { Retorna, Retorno } from 'src/types';
import { PrismaService } from '../orm/prisma.service';

@Injectable()
export class PedidoService {
  constructor(private readonly prismaService: PrismaService) {}

  async buscarPedidos(): Promise<Retorno<Pedido[]>> {
    const pedidos = await this.prismaService.pedido.findMany();

    return Retorna.Sucesso<Pedido[]>('Ok', pedidos);
  }

  async filtrarPedidos(pesquisa: FiltrarPedidoDto): Promise<Retorno<Pedido[]>> {
    const pedidos = await this.prismaService.pedido.findMany({
      where: { ...pesquisa },
    });

    return Retorna.Sucesso<Pedido[]>('Ok', pedidos);
  }

  async buscarPedidoPorId(id: string): Promise<Retorno<Pedido>> {
    const pedido = await this.prismaService.pedido.findUnique({
      where: { id },
    });

    if (!pedido) {
      return Retorna.Falha<Pedido>('Nenhum pedido encontrado');
    }

    return Retorna.Sucesso<Pedido>('Ok', pedido);
  }

  async criarPedido(dadosPedido: CriarPedidoDto): Promise<Retorno<Pedido>> {
    const pedido = await this.prismaService.pedido.create({
      data: {
        numeroPedido: Math.random() * 100,
        dataPrevisaoEntrega: dadosPedido.dataPrevisaoEntrega,
        cliente: {
          nome: dadosPedido.cliente.nome,
          documento: dadosPedido.cliente.documento,
        },
        enderecoEntrega: {
          cep: dadosPedido.enderecoEntrega.cep,
          logradouro: dadosPedido.enderecoEntrega.logradouro,
          numero: dadosPedido.enderecoEntrega.numero,
          complemento: dadosPedido.enderecoEntrega.complemento,
          bairro: dadosPedido.enderecoEntrega.bairro,
          cidade: dadosPedido.enderecoEntrega.cidade,
        },
        items: dadosPedido.items.map((_) => ({
          descricao: _.descricao,
          preco: _.preco,
        })),
      },
    });

    return Retorna.Sucesso<Pedido>('Ok', pedido);
  }

  async atualizarPedido(
    id: string,
    dadosAtualizacao: AtualizarPedidoDto,
  ): Promise<Retorno<Pedido>> {
    const pedido = await this.prismaService.pedido.update({
      where: { id },
      data: dadosAtualizacao,
    });

    return Retorna.Sucesso<Pedido>('Ok', pedido);
  }

  async excluirPedido(id: string): Promise<Retorno<Pedido>> {
    const pedido = await this.prismaService.pedido.delete({
      where: { id },
    });

    return Retorna.Sucesso<Pedido>('Ok', pedido);
  }
}
