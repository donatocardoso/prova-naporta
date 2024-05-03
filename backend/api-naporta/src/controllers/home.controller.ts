import { Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Public } from 'src/configs/jwt-auth.guard';
import { Reaction } from 'src/configs/response';
import { AuthDto } from 'src/dtos/home/auth.dto';
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
  @ApiBody({ type: AuthDto })
  @Public()
  async signIn(@Body() authDto: AuthDto): Promise<Reaction<string>> {
    const reaction: any = await this.homeService.signIn(authDto);

    return reaction;
  }
}