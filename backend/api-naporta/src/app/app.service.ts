import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Cryptr from 'cryptr';
import moment from 'moment';
import { AuthDto } from 'src/dtos/app/auth.dto';
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

  async signIn(authDto: AuthDto): Promise<{ access_token: string }> {
    const usuario = await this.usuarioService.buscarUsuarioPorLogin(
      authDto.login,
    );

    if (!usuario || !usuario.sucesso || !usuario.conteudo?.senha) {
      throw new UnauthorizedException();
    }

    const cryptr = new Cryptr(process.env.BUTTERCUP_SECRET);
    const senha = cryptr.decrypt(authDto.senha);

    if (senha !== usuario.conteudo.senha) {
      throw new UnauthorizedException();
    }

    const payload = { sub: usuario.conteudo.id, login: authDto.login };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
