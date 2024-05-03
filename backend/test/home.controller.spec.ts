import { Test, TestingModule } from '@nestjs/testing';
import { Reaction } from 'src/configs/response';
import { HomeController } from 'src/controllers/home.controller';
import { AuthDto } from 'src/dtos/home/auth.dto';
import { HomeModule } from 'src/modules/home.module';

describe('HomeController', () => {
  let controller: HomeController;

  const TYPE_MOCK: Reaction<string> = null;

  const AUTH_LOGIN_INVALID_MOCK: AuthDto = { login: 'test', password: 'test' };
  const AUTH_PASS_INVALID_MOCK: AuthDto = { login: 'jest', password: 'test' };
  const AUTH_VALID_MOCK: AuthDto = { login: 'jest', password: '399bhYTIHl' };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HomeModule],
    }).compile();

    controller = module.get<HomeController>(HomeController);
  });

  it('controller: should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('/ (GET): should not return', async () => {
    const response = await controller.index();

    expect(response).toBeUndefined();
  });

  it('/ping (GET): should return a message', async () => {
    const response = await controller.ping();

    expect(response).toBeDefined();
    expect(typeof response).toBe('string');

    expect(response).toContain('Hello World!');
  });

  it('/login (POST): should return Unauthorized', async () => {
    const response = await controller.signIn(AUTH_LOGIN_INVALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Unauthorized');
    expect(response.content).toBeUndefined();
  });

  it('/login (POST): should return Unauthorized', async () => {
    const response = await controller.signIn(AUTH_PASS_INVALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Unauthorized');
    expect(response.content).toBeUndefined();
  });

  it('/login (POST): should return Jwt Token', async () => {
    const response = await controller.signIn(AUTH_VALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
  });
});
