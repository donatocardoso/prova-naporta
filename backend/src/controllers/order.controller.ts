import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Reaction } from 'src/configs/response';
import { OrderCreateDto } from 'src/dtos/order/order.create.dto';
import { OrderFilterDto } from 'src/dtos/order/order.filter.dto';
import { OrderUpdateDto } from 'src/dtos/order/order.update.dto';
import { OrderDto } from 'src/dtos/shared/order.dto';
import { OrderService } from 'src/services/order.service';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders(): Promise<Reaction<OrderDto[]>> {
    const reaction: any = await this.orderService.getOrders();

    return reaction;
  }

  @Get('filtrar')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ type: OrderFilterDto })
  async getOrdersByFilter(@Query() filterDto: OrderFilterDto): Promise<Reaction<OrderDto[]>> {
    const reaction: any = await this.orderService.getOrdersByFilter(filterDto);

    return reaction;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrderById(@Param('id') id: string): Promise<Reaction<OrderDto>> {
    const reaction: any = await this.orderService.getOrderById(id);

    return reaction;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: OrderCreateDto })
  async createOrder(@Body() createDto: OrderCreateDto): Promise<Reaction<OrderDto>> {
    const reaction: any = await this.orderService.createOrder(createDto);

    return reaction;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: OrderUpdateDto })
  async updateOrder(@Param('id') id: string, @Body() updateDto: OrderUpdateDto): Promise<Reaction<OrderDto>> {
    const reaction: any = await this.orderService.updateOrder(id, updateDto);

    return reaction;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteOrder(@Param('id') id: string): Promise<Reaction<OrderDto>> {
    const reaction: any = await this.orderService.deleteOrder(id);

    return reaction;
  }
}
