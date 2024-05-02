import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response, Responser } from 'src/configs/response';
import { UserCreateDto } from 'src/dtos/user/user.create.dto';
import { UserFilterDto } from 'src/dtos/user/user.filter.dto';
import { UserUpdateDto } from 'src/dtos/user/user.update.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<Response<User[]>> {
    const users = await this.prismaService.user.findMany();

    return Responser.Success<User[]>('Ok', users);
  }

  async getUsersByFilter(filterDto: UserFilterDto): Promise<Response<User[]>> {
    const users = await this.prismaService.user.findMany({
      where: { ...filterDto },
    });

    return Responser.Success<User[]>('Ok', users);
  }

  async getUserById(id: string): Promise<Response<User>> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return Responser.Fail<User>('Nenhum user encontrado');
    }

    return Responser.Success<User>('Ok', user);
  }

  async getUserByLogin(login: string): Promise<Response<User>> {
    const user = await this.prismaService.user.findFirst({
      where: { login },
    });

    if (!user) {
      return Responser.Fail<User>('Nenhum user encontrado');
    }

    return Responser.Success<User>('Ok', user);
  }

  async createUser(createDto: UserCreateDto): Promise<Response<User>> {
    const user = await this.prismaService.user.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        login: createDto.login,
        password: createDto.password,
      },
    });

    return Responser.Success<User>('Ok', user);
  }

  async updateUser(
    id: string,
    updateDto: UserUpdateDto,
  ): Promise<Response<User>> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { ...updateDto },
    });

    return Responser.Success<User>('Ok', user);
  }

  async deleteUser(id: string): Promise<Response<User>> {
    const user = await this.prismaService.user.delete({
      where: { id },
    });

    return Responser.Success<User>('Ok', user);
  }
}
