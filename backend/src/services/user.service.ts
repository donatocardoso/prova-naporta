import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import moment from 'moment';
import { Reaction, Responser } from 'src/configs/response';
import { UserCreateDto } from 'src/dtos/user/user.create.dto';
import { UserFilterDto } from 'src/dtos/user/user.filter.dto';
import { UserUpdateDto } from 'src/dtos/user/user.update.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<Reaction<User[]>> {
    const users = await this.prismaService.user.findMany();

    return Responser.Success<User[]>('Ok', users);
  }

  async getUsersByFilter(filterDto: UserFilterDto): Promise<Reaction<User[]>> {
    const users = await this.prismaService.user.findMany({
      where: {
        name: filterDto.name,
        description: filterDto.description,
        login: filterDto.login,
        password: filterDto.password,
        active: filterDto.active,
        createdAt: moment(filterDto.createdAt).format('YYYY-MM-DD'),
      },
      skip: (filterDto.page - 1) * filterDto.quantity,
      take: filterDto.quantity,
    });

    return Responser.Success<User[]>('Ok', users);
  }

  async getUserById(id: string): Promise<Reaction<User>> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return Responser.Fail<User>('Nenhum user encontrado');
    }

    return Responser.Success<User>('Ok', user);
  }

  async getUserByLogin(login: string): Promise<Reaction<User>> {
    const user = await this.prismaService.user.findFirst({
      where: { login },
    });

    return Responser.Success<User>('Ok', user);
  }

  async createUser(createDto: UserCreateDto): Promise<Reaction<User>> {
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

  async updateUser(id: string, updateDto: UserUpdateDto): Promise<Reaction<User>> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { ...updateDto },
    });

    return Responser.Success<User>('Ok', user);
  }

  async deleteUser(id: string): Promise<Reaction<User>> {
    const user = await this.prismaService.user.delete({
      where: { id },
    });

    return Responser.Success<User>('Ok', user);
  }
}
