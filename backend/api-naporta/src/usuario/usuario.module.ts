import { Module } from '@nestjs/common';
import { PrismaService } from 'src/orm/prisma.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [PrismaService, UsuarioService],
})
export class UsuarioModule {}
