import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PrismaModule } from '../orm/prisma.module';
import { PedidoModule } from '../pedido/pedido.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PedidoModule,
    UsuarioModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [JwtService, AppService, UsuarioService],
})
export class AppModule {}
