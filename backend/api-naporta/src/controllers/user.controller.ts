import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from 'src/dtos/user/user.create.dto';
import { UserFilterDto } from 'src/dtos/user/user.filter.dto';
import { UserUpdateDto } from 'src/dtos/user/user.update.dto';
import { UserService } from 'src/services/user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('filtrar')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ type: UserFilterDto })
  async getUsersByFilter(@Query() filterDto: UserFilterDto) {
    return await this.userService.getUsersByFilter(filterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: UserCreateDto })
  async createUser(@Body() createDto: UserCreateDto) {
    return await this.userService.createUser(createDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserUpdateDto })
  async updateUser(@Param('id') id: string, @Body() updateDto: UserUpdateDto) {
    return await this.userService.updateUser(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
