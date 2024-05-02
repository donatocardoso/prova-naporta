import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Public } from 'src/configs/jwt-auth.guard';
import { AuthDto } from 'src/dtos/app/auth.dto';
import { AppService } from 'src/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @HttpCode(HttpStatus.OK)
  @Public()
  async ping(): Promise<string> {
    return await this.appService.ping();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthDto })
  @Public()
  async signIn(@Body() authDto: AuthDto) {
    return this.appService.signIn(authDto);
  }
}
