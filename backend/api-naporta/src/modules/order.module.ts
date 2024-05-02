import { Module } from '@nestjs/common';
import { OrderController } from 'src/controllers/order.controller';
import { OrderService } from 'src/services/order.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [OrderController],
  providers: [PrismaService, OrderService],
})
export class OrderModule {}
