import { Injectable } from '@nestjs/common';
import { Pedido } from '@prisma/client';
import { Retorna, Retorno } from 'src/types';
import { PrismaService } from '../orm/prisma.service';

@Injectable()
export class PedidoService {
  constructor(private readonly prismaService: PrismaService) {}

  async buscarPedidos(): Promise<Retorno<Pedido[]>> {
    const pedidos = await this.prismaService.pedido.findMany();

    return Retorna.Sucesso<Pedido[]>('Ok', pedidos);
  }

  async filtrarPedidos(pesquisa: Pedido): Promise<Retorno<Pedido[]>> {
    const pedidos = await this.prismaService.pedido.findMany({
      where: pesquisa,
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

  async criarPedido(dadosPedido: Pedido): Promise<Retorno<Pedido>> {
    const pedido = await this.prismaService.pedido.create({
      data: dadosPedido,
    });

    return Retorna.Sucesso<Pedido>('Ok', pedido);
  }

  async atualizarPedido(
    id: string,
    dadosAtualizacao: Pedido,
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
