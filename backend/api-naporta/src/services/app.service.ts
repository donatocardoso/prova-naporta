import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { AuthDto } from 'src/dtos/app/auth.dto';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async ping(): Promise<string> {
    const mensagem = [];

    mensagem.push('Hello World!');
    mensagem.push('Aqui é a "api-naporta"');
    mensagem.push('Hoje é: ' + moment().format());

    return mensagem.join('\r\n\r\n');
  }

  async signIn(authDto: AuthDto): Promise<string> {
    const user = await this.userService.getUserByLogin(authDto.login);

    if (!user || !user.success || !user.content?.password) {
      throw new UnauthorizedException();
    }

    //const cryptr = new Cryptr(process.env.BUTTERCUP_SECRET);

    //console.log(cryptr.encrypt(''));

    //const password = cryptr.decrypt(authDto.password);

    if (authDto.password !== user.content.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.content.id, login: authDto.login };

    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
