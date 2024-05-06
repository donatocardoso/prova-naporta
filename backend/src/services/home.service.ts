import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { Reaction, Responser } from 'src/configs/response';
import { AuthenticateDto } from 'src/dtos/home/authenticate.dto';
import { AuthorizedDto } from 'src/dtos/home/authorized.dto';
import { UserService } from 'src/services/user.service';

@Injectable()
export class HomeService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async ping(): Promise<string> {
    const message = [];

    message.push('Hello World!');
    message.push('Aqui é a "api-naporta"');
    message.push('Hoje é: ' + moment().format());

    return message.join('\r\n\r\n');
  }

  async signIn(authDto: AuthenticateDto): Promise<Reaction<AuthorizedDto>> {
    const user = await this.userService.getUserByLogin(authDto.login);

    if (!user || !user.success || !user.content?.password) {
      return Responser.Fail<AuthorizedDto>('Unauthorized');
    }

    //const cryptr = new Cryptr(process.env.BUTTERCUP_SECRET);

    //console.log(cryptr.encrypt(''));

    //const password = cryptr.decrypt(authDto.password);

    if (authDto.password !== user.content.password) {
      return Responser.Fail<AuthorizedDto>('Unauthorized');
    }

    const payload = {
      sub: user.content.id,
      login: authDto.login,
      date: Date.now().toString(),
    };

    return Responser.Success('Ok', {
      id: user.content.id,
      login: authDto.login,
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    });
  }
}
