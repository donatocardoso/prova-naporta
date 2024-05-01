import { Module } from '@nestjs/common';
import { PrismaService } from 'src/orm/prisma.service';
import { PedidoSeed } from './pedido.seed';

@Module({
  providers: [PrismaService, PedidoSeed],
})
export class SeedModule {}
