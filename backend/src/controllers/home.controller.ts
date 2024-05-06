import { Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Public } from 'src/configs/jwt-auth.guard';
import { Reaction } from 'src/configs/response';
import { AuthenticateDto } from 'src/dtos/home/authenticate.dto';
import { AuthorizedDto } from 'src/dtos/home/authorized.dto';
import { HomeService } from 'src/services/home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @Redirect('/ping', HttpStatus.MOVED_PERMANENTLY)
  async index() {}

  @Get('ping')
  @HttpCode(HttpStatus.OK)
  @Public()
  async ping(): Promise<string> {
    const reaction: any = await this.homeService.ping();

    return reaction;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthenticateDto })
  @Public()
  async signIn(@Body() authDto: AuthenticateDto): Promise<Reaction<AuthorizedDto>> {
    const reaction: any = await this.homeService.signIn(authDto);

    return reaction;
  }
}
