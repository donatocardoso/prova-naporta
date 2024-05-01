import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  async buscarUsuarios() {
    return await this.usuarioService.buscarUsuarios();
  }

  @Get('filtrar')
  @ApiQuery({ type: FiltrarUsuarioDto })
  async filtrarUsuarios(@Query() pesquisa: FiltrarUsuarioDto) {
    return await this.usuarioService.filtrarUsuarios(pesquisa);
  }

  @Get(':id')
  async buscarUsuarioPorId(@Param('id') id: string) {
    return await this.usuarioService.buscarUsuarioPorId(id);
  }

  @Post()
  @ApiBody({ type: CriarUsuarioDto })
  async criarUsuario(@Body() dadosUsuario: CriarUsuarioDto) {
    return await this.usuarioService.criarUsuario(dadosUsuario);
  }

  @Put(':id')
  @ApiBody({ type: AtualizarUsuarioDto })
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() dadosAtualizacao: AtualizarUsuarioDto,
  ) {
    return await this.usuarioService.atualizarUsuario(id, dadosAtualizacao);
  }

  @Delete(':id')
  async excluirUsuario(@Param('id') id: string) {
    return await this.usuarioService.excluirUsuario(id);
  }
}
