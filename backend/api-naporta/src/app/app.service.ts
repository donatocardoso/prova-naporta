import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}

  async ping(): Promise<string> {
    const mensagem = [];

    mensagem.push('Hello World!');
    mensagem.push('Aqui é a "api-naporta"');
    mensagem.push('Hoje é: ' + moment().format());

    return mensagem.join('\r\n\r\n');
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const usuario = await this.usuarioService.buscarUsuarioPorLogin(username);

    if (usuario?.conteudo?.senha !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: usuario.conteudo.id, username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
