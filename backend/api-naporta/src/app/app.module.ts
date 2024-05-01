import { Module } from '@nestjs/common';
import { PrismaModule } from '../orm/prisma.module';
import { PedidoModule } from '../pedido/pedido.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, PedidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
