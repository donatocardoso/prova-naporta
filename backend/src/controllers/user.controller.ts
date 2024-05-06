import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Reaction } from 'src/configs/response';
import { UserDto } from 'src/dtos/shared/user.dto';
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
  async getUsers(): Promise<Reaction<UserDto[]>> {
    const reaction: any = await this.userService.getUsers();

    return reaction;
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ type: UserFilterDto })
  async getUsersByFilter(@Query() filterDto: UserFilterDto): Promise<Reaction<UserDto[]>> {
    const reaction: any = await this.userService.getUsersByFilter(filterDto);

    return reaction;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string): Promise<Reaction<UserDto>> {
    const reaction: any = await this.userService.getUserById(id);

    return reaction;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: UserCreateDto })
  async createUser(@Body() createDto: UserCreateDto): Promise<Reaction<UserDto>> {
    const reaction: any = await this.userService.createUser(createDto);

    return reaction;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserUpdateDto })
  async updateUser(@Param('id') id: string, @Body() updateDto: UserUpdateDto): Promise<Reaction<UserDto>> {
    const reaction: any = await this.userService.updateUser(id, updateDto);

    return reaction;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string): Promise<Reaction<UserDto>> {
    const reaction: any = await this.userService.deleteUser(id);

    return reaction;
  }
}
