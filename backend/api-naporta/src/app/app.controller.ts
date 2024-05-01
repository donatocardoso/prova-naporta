import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @HttpCode(HttpStatus.OK)
  async ping(): Promise<string> {
    return await this.appService.ping();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.appService.signIn(signInDto.username, signInDto.password);
  }
}
