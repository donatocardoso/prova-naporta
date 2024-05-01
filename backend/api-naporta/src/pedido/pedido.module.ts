import { Module } from '@nestjs/common';
import { PrismaService } from 'src/orm/prisma.service';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';

@Module({
  controllers: [PedidoController],
  providers: [PrismaService, PedidoService],
})
export class PedidoModule {}
