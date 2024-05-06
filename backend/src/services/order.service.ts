import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import moment from 'moment';
import { Reaction, Responser } from 'src/configs/response';
import { OrderCreateDto } from 'src/dtos/order/order.create.dto';
import { OrderFilterDto } from 'src/dtos/order/order.filter.dto';
import { OrderUpdateDto } from 'src/dtos/order/order.update.dto';
import { PaginateDto } from 'src/dtos/shared/paginate.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrders(paginateDto: PaginateDto): Promise<Reaction<Order[]>> {
    const orders = await this.prismaService.order.findMany({
      skip: Number((paginateDto.page - 1) * paginateDto.quantity),
      take: Number(paginateDto.quantity),
    });

    return Responser.Success<Order[]>('Ok', orders);
  }

  async getOrdersByFilter(filterDto: OrderFilterDto): Promise<Reaction<Order[]>> {
    const orders = await this.prismaService.order.findMany({
      where: {
        orderNumber: filterDto.orderNumber,
        expectedDeliveryDate: moment(filterDto.expectedDeliveryDate).format('YYYY-MM-DD'),
        customer: {
          name: filterDto.customer.name,
          cpf: filterDto.customer.cpf,
          rg: filterDto.customer.rg,
          birthDate: moment(filterDto.customer.birthDate).format('YYYY-MM-DD'),
          cellphone: filterDto.customer.cellphone,
          email: filterDto.customer.email,
        },
        deliveryAddress: {
          zipcode: filterDto.deliveryAddress.zipcode,
          address: filterDto.deliveryAddress.address,
          number: filterDto.deliveryAddress.number,
          complement: filterDto.deliveryAddress.complement,
          neighborhood: filterDto.deliveryAddress.neighborhood,
          city: filterDto.deliveryAddress.city,
          district: filterDto.deliveryAddress.district,
        },
        items: {
          some: {
            description: filterDto.item.description,
            prize: filterDto.item.prize,
          },
        },
        createdAt: moment(filterDto.createdAt).format('YYYY-MM-DD'),
      },
      skip: (filterDto.page - 1) * filterDto.quantity,
      take: filterDto.quantity,
    });

    return Responser.Success<Order[]>('Ok', orders);
  }

  async getOrderById(id: string): Promise<Reaction<Order>> {
    const order = await this.prismaService.order.findUnique({
      where: { id },
    });

    if (!order) {
      return Responser.Fail<Order>('Nenhum order encontrado');
    }

    return Responser.Success<Order>('Ok', order);
  }

  async createOrder(createDto: OrderCreateDto): Promise<Reaction<Order>> {
    const order = await this.prismaService.order.create({
      data: {
        orderNumber: Math.random() * 100,
        expectedDeliveryDate: createDto.expectedDeliveryDate,
        customer: {
          name: createDto.customer.name,
          cpf: createDto.customer.cpf,
          rg: createDto.customer.rg,
          birthDate: createDto.customer.birthDate,
          cellphone: createDto.customer.cellphone,
          email: createDto.customer.email,
        },
        deliveryAddress: {
          zipcode: createDto.deliveryAddress.zipcode,
          address: createDto.deliveryAddress.address,
          number: createDto.deliveryAddress.number,
          complement: createDto.deliveryAddress.complement,
          neighborhood: createDto.deliveryAddress.neighborhood,
          city: createDto.deliveryAddress.city,
          district: createDto.deliveryAddress.district,
        },
        items: createDto.items.map((_) => ({
          description: _.description,
          prize: _.prize,
        })),
      },
    });

    return Responser.Success<Order>('Ok', order);
  }

  async updateOrder(id: string, updateDto: OrderUpdateDto): Promise<Reaction<Order>> {
    const order = await this.prismaService.order.update({
      where: { id },
      data: updateDto,
    });

    return Responser.Success<Order>('Ok', order);
  }

  async deleteOrder(id: string): Promise<Reaction<Order>> {
    const order = await this.prismaService.order.delete({
      where: { id },
    });

    return Responser.Success<Order>('Ok', order);
  }
}
