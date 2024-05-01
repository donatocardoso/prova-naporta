import _4devs from '@killovsky/4devs';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/orm/prisma.service';

@Injectable()
export class PedidoSeed {
  constructor(private prisma: PrismaService) {}

  async PedidoSeeds() {
    const pessoas = await _4devs.gerar(50, false, 'pessoa');

    console.log(pessoas);

    return;

    await this.prisma.pedido.create({
      data: {
        numeroPedido: 1,
        dataPrevisaoEntrega: new Date(),
        cliente: {
          nome: '',
          documento: '',
        },
        enderecoEntrega: {
          cep: 0,
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
        },
        items: [
          {
            descricao: '',
            preco: 0.0,
          },
          {
            descricao: '',
            preco: 0.0,
          },
        ],
      },
    });
  }
}
