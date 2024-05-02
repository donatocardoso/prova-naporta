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
import { OrderCreateDto } from 'src/dtos/order/order.create.dto';
import { OrderFilterDto } from 'src/dtos/order/order.filter.dto';
import { OrderUpdateDto } from 'src/dtos/order/order.update.dto';
import { OrderService } from 'src/services/order.service';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get('filtrar')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ type: OrderFilterDto })
  async getOrdersByFilter(@Query() filterDto: OrderFilterDto) {
    return await this.orderService.getOrdersByFilter(filterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrderById(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: OrderCreateDto })
  async createOrder(@Body() createDto: OrderCreateDto) {
    return await this.orderService.createOrder(createDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: OrderUpdateDto })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateDto: OrderUpdateDto,
  ) {
    return await this.orderService.updateOrder(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id);
  }
}
