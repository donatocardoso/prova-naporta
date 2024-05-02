import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from 'src/controllers/home.controller';
import { HomeModule } from 'src/modules/home.module';

describe('HomeController', () => {
  let appController: HomeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HomeModule],
    }).compile();

    appController = app.get<HomeController>(HomeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      appController.ping().then((data) => expect(data).toContain('Hello World!'));
    });
  });
});
