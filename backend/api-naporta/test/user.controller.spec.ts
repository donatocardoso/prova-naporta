import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { Reaction } from 'src/configs/response';
import { UserController } from 'src/controllers/user.controller';
import { UserCreateDto } from 'src/dtos/user/user.create.dto';
import { UserFilterDto } from 'src/dtos/user/user.filter.dto';
import { UserUpdateDto } from 'src/dtos/user/user.update.dto';
import { UserModule } from 'src/modules/user.module';

describe('UserController', () => {
  let controller: UserController;
  let ID_VALID_MOCK: string;

  const ID_INVALID_MOCK: string = '663411e6fc9ca0224e5ab4f1';

  const TYPE_MOCK: Reaction<User> = null;

  const FILTER_MOCK: UserFilterDto = {
    login: 'jest',
  };

  const CREATE_MOCK: UserCreateDto = {
    name: 'MOCK_USER',
    description: 'MOCK_USER',
    login: 'MOCK_USER',
    password: 'MOCK_USER',
  };

  const UPDATE_MOCK: UserUpdateDto = {
    name: 'MOCK_USER',
    description: 'MOCK_USER',
    login: 'MOCK_USER',
    password: 'MOCK_USER',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('controller: should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('/user/createUser (POST): should return a list of filtered users', async () => {
    const response = await controller.createUser(CREATE_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();

    ID_VALID_MOCK = response.content.id;
  });

  it('/user/getUsers (GET): should return a list of users', async () => {
    const response = await controller.getUsers();

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
    expect(response.content.length > 0).toBe(true);
  });

  it('/user/getUsersByFilter (GET): should return a list of filtered users', async () => {
    const response = await controller.getUsersByFilter(FILTER_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
    expect(response.content.length > 0).toBe(true);
  });

  it('/user/getUserById (GET): should return a user', async () => {
    const response = await controller.getUserById(ID_VALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
  });

  it('/user/getUserById (GET): should not return a user', async () => {
    const response = await controller.getUserById(ID_INVALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(false);
    expect(response.message).toBe('Nenhum user encontrado');
    expect(response.content).toBeUndefined();
  });

  it('/user/updateUser (PUT): should return a list of filtered users', async () => {
    const response = await controller.updateUser(ID_VALID_MOCK, UPDATE_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
  });

  it('/user/deleteUser (DELETE): should return a list of filtered users', async () => {
    const response = await controller.deleteUser(ID_VALID_MOCK);

    expect(response).toBeDefined();
    expect(typeof response).toBe(typeof TYPE_MOCK);

    expect(response.success).toBe(true);
    expect(response.message).toBe('Ok');
    expect(response.content).toBeDefined();
  });
});
