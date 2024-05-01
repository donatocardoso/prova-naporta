import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { AtualizarUsuarioDto } from 'src/dtos/usuario/atualizarUsuario.dto';
import { CriarUsuarioDto } from 'src/dtos/usuario/criarUsuario.dto';
import { FiltrarUsuarioDto } from 'src/dtos/usuario/filtrarUsuario.dto';
import { Retorna, Retorno } from 'src/types';
import { PrismaService } from '../orm/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async buscarUsuarios(): Promise<Retorno<Usuario[]>> {
    const usuarios = await this.prismaService.usuario.findMany();

    return Retorna.Sucesso<Usuario[]>('Ok', usuarios);
  }

  async filtrarUsuarios(
    pesquisa: FiltrarUsuarioDto,
  ): Promise<Retorno<Usuario[]>> {
    const usuarios = await this.prismaService.usuario.findMany({
      where: { ...pesquisa },
    });

    return Retorna.Sucesso<Usuario[]>('Ok', usuarios);
  }

  async buscarUsuarioPorId(id: string): Promise<Retorno<Usuario>> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      return Retorna.Falha<Usuario>('Nenhum usuario encontrado');
    }

    return Retorna.Sucesso<Usuario>('Ok', usuario);
  }

  async buscarUsuarioPorLogin(login: string): Promise<Retorno<Usuario>> {
    const usuario = await this.prismaService.usuario.findFirst({
      where: { login },
    });

    if (!usuario) {
      return Retorna.Falha<Usuario>('Nenhum usuario encontrado');
    }

    return Retorna.Sucesso<Usuario>('Ok', usuario);
  }

  async criarUsuario(dadosUsuario: CriarUsuarioDto): Promise<Retorno<Usuario>> {
    const usuario = await this.prismaService.usuario.create({
      data: {
        nome: dadosUsuario.nome,
        descricao: dadosUsuario.descricao,
        login: dadosUsuario.login,
        senha: dadosUsuario.senha,
      },
    });

    return Retorna.Sucesso<Usuario>('Ok', usuario);
  }

  async atualizarUsuario(
    id: string,
    dadosAtualizacao: AtualizarUsuarioDto,
  ): Promise<Retorno<Usuario>> {
    const usuario = await this.prismaService.usuario.update({
      where: { id },
      data: { ...dadosAtualizacao },
    });

    return Retorna.Sucesso<Usuario>('Ok', usuario);
  }

  async excluirUsuario(id: string): Promise<Retorno<Usuario>> {
    const usuario = await this.prismaService.usuario.delete({
      where: { id },
    });

    return Retorna.Sucesso<Usuario>('Ok', usuario);
  }
}
