import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from 'src/controllers/order.controller';
import { OrderModule } from 'src/modules/order.module';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
