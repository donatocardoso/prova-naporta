import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HomeModule } from 'src/modules/home.module';
import request from 'supertest';

describe('HomeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HomeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .then((data) => {
        expect(data.statusCode).toBe(HttpStatus.MOVED_PERMANENTLY);
        expect(data.text).toContain('Moved Permanently. Redirecting to /ping');
      });
  });

  it('/ping (GET)', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .then((data) => {
        expect(data.statusCode).toBe(HttpStatus.OK);
        expect(data.text).toContain('Hello World!');
      });
  });
});
