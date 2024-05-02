import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { Response, Responser } from 'src/configs/response';
import { OrderCreateDto } from 'src/dtos/order/order.create.dto';
import { OrderFilterDto } from 'src/dtos/order/order.filter.dto';
import { OrderUpdateDto } from 'src/dtos/order/order.update.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrders(): Promise<Response<Order[]>> {
    const orders = await this.prismaService.order.findMany();

    return Responser.Success<Order[]>('Ok', orders);
  }

  async getOrdersByFilter(
    filterDto: OrderFilterDto,
  ): Promise<Response<Order[]>> {
    const orders = await this.prismaService.order.findMany({
      where: { ...filterDto },
    });

    return Responser.Success<Order[]>('Ok', orders);
  }

  async getOrderById(id: string): Promise<Response<Order>> {
    const order = await this.prismaService.order.findUnique({
      where: { id },
    });

    if (!order) {
      return Responser.Fail<Order>('Nenhum order encontrado');
    }

    return Responser.Success<Order>('Ok', order);
  }

  async createOrder(createDto: OrderCreateDto): Promise<Response<Order>> {
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

  async updateOrder(
    id: string,
    updateDto: OrderUpdateDto,
  ): Promise<Response<Order>> {
    const order = await this.prismaService.order.update({
      where: { id },
      data: updateDto,
    });

    return Responser.Success<Order>('Ok', order);
  }

  async deleteOrder(id: string): Promise<Response<Order>> {
    const order = await this.prismaService.order.delete({
      where: { id },
    });

    return Responser.Success<Order>('Ok', order);
  }
}
