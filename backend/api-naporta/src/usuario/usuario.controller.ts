import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/app/jwt-auth.guard';
import { AtualizarUsuarioDto } from 'src/dtos/usuario/atualizarUsuario.dto';
import { CriarUsuarioDto } from 'src/dtos/usuario/criarUsuario.dto';
import { FiltrarUsuarioDto } from 'src/dtos/usuario/filtrarUsuario.dto';
import { UsuarioService } from './usuario.service';

@ApiBearerAuth()
@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async buscarUsuarios() {
    return await this.usuarioService.buscarUsuarios();
  }

  @Get('filtrar')
  @ApiQuery({ type: FiltrarUsuarioDto })
  @UseGuards(JwtAuthGuard)
  async filtrarUsuarios(@Query() pesquisa: FiltrarUsuarioDto) {
    return await this.usuarioService.filtrarUsuarios(pesquisa);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async buscarUsuarioPorId(@Param('id') id: string) {
    return await this.usuarioService.buscarUsuarioPorId(id);
  }

  @Post()
  @ApiBody({ type: CriarUsuarioDto })
  @UseGuards(JwtAuthGuard)
  async criarUsuario(@Body() dadosUsuario: CriarUsuarioDto) {
    return await this.usuarioService.criarUsuario(dadosUsuario);
  }

  @Put(':id')
  @ApiBody({ type: AtualizarUsuarioDto })
  @UseGuards(JwtAuthGuard)
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() dadosAtualizacao: AtualizarUsuarioDto,
  ) {
    return await this.usuarioService.atualizarUsuario(id, dadosAtualizacao);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async excluirUsuario(@Param('id') id: string) {
    return await this.usuarioService.excluirUsuario(id);
  }
}
