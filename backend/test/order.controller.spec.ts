import { Test, TestingModule } from '@nestjs/testing';
import { Order } from '@prisma/client';
import moment from 'moment';
import { Reaction } from 'src/configs/response';
import { OrderController } from 'src/controllers/order.controller';
import { OrderCreateDto } from 'src/dtos/order/order.create.dto';
import { OrderFilterDto } from 'src/dtos/order/order.filter.dto';
import { OrderUpdateDto } from 'src/dtos/order/order.update.dto';
import { OrderModule } from 'src/modules/order.module';

describe('OrderController', () => {
  let controller: OrderController;
  let ORDER_NUMBER_MOCK: number;
  let ID_VALID_MOCK: string;

  const ID_INVALID_MOCK: string = '663411e6fc9ca0224e5ab4f1';

  const TYPE_MOCK: Reaction<Order> = null;

  const FILTER_MOCK: OrderFilterDto = {
    orderNumber: ORDER_NUMBER_MOCK,
  };

  const CREATE_MOCK: OrderCreateDto = {
    expectedDeliveryDate: moment().add(1, 'days').toDate(),
    customer: {
      name: 'MOCK_CUSTOMER_NAME',
      cpf: 'MOCK_CUSTOMER_CPF',
      rg: 'MOCK_CUSTOMER_RG',
      birthDate: moment('01/01/2000', 'DD/MM/YYYY').toDate(),
      cellphone: 'MOCK_CUSTOMER_CELLPHONE',
      email: 'MOCK_CUSTOMER_EMAIL',
    },
    deliveryAddress: {
      zipcode: 'MOCK_ADDRESS_ZIPCODE',
      address: 'MOCK_ADDRESS_ADDRESS',
      number: 'MOCK_ADDRESS_NUMBER',
      complement: 'MOCK_ADDRESS_COMPLEMENT',
      neighborhood: 'MOCK_ADDRESS_NEIGHBORHOOD',
      city: 'MOCK_ADDRESS_CITY',
      district: 'MOCK_ADDRESS_DISTRICT',
    },
    items: [
      {
        description: 'MOCK_ITEM_DESCRIPTION',
        prize: 2.5,
      },
    ],
  };

  const UPDATE_MOCK: OrderUpdateDto = {
    deliveryAddress: {
      zipcode: 'MOCK_2_ADDRESS_ZIPCODE',
      address: 'MOCK_2_ADDRESS_ADDRESS',
      number: 'MOCK_2_ADDRESS_NUMBER',
      complement: 'MOCK_2_ADDRESS_COMPLEMENT',
      neighborhood: 'MOCK_2_ADDRESS_NEIGHBORHOOD',
      city: 'MOCK_2_ADDRESS_CITY',
      district: 'MOCK_2_ADDRESS_DISTRICT',
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('controller: should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('/order/createOrder (POST): should return a list of filtered orders', async () => {
    const response = await controller.createOrder(CREATE_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();

    ID_VALID_MOCK = response.content.id;
    ORDER_NUMBER_MOCK = response.content.orderNumber;
  });

  it('/order/getOrders (GET): should return a list of orders', async () => {
    const response = await controller.getOrders();

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
    expect(response.content.length > 0).toBe(true);
  });

  it('/order/getOrdersByFilter (GET): should return a list of filtered orders', async () => {
    const response = await controller.getOrdersByFilter(FILTER_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
    expect(response.content.length > 0).toBe(true);
  });

  it('/order/getOrderById (GET): should not return a order', async () => {
    const response = await controller.getOrderById(ID_VALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
  });

  it('/order/getOrderById (GET): should not return a order', async () => {
    const response = await controller.getOrderById(ID_INVALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Nenhum order encontrado');
    expect(response.content).toBeUndefined();
  });

  it('/order/updateOrder (PUT): should return a list of filtered orders', async () => {
    const response = await controller.updateOrder(ID_VALID_MOCK, UPDATE_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
  });

  it('/order/deleteOrder (DELETE): should return a list of filtered orders', async () => {
    const response = await controller.deleteOrder(ID_VALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
  });
});
