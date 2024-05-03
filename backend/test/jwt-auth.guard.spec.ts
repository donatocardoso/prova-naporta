import { ExecutionContext, HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/configs/jwt-auth.guard';
import { AuthDto } from 'src/dtos/home/auth.dto';
import { HomeModule } from 'src/modules/home.module';
import supertest from 'supertest';

describe('HomeController', () => {
  let app: INestApplication;
  let JWT_TOKEN: string;

  const AUTH_VALID_MOCK: AuthDto = { login: 'jest', password: '399bhYTIHl' };

  beforeAll(async () => {
    const JwtAuthGuardMock = {
      async canActivate(ctx: ExecutionContext) {
        const request = ctx.switchToHttp().getRequest();

        request.headers.set('Authorization', '');

        return true;
      },
    } as JwtAuthGuard;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HomeModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue(JwtAuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('AuthGuard: should return HttpStatus.UNAUTHORIZED on private route', async () => {
    return supertest(app.getHttpServer())
      .get('/')
      .then((data) => {
        expect(data.statusCode).toBe(HttpStatus.UNAUTHORIZED);
        expect(data.body.message).toBe('Unauthorized');
      });
  });

  it('AuthGuard: should return HttpStatus.OK on public route', async () => {
    return supertest(app.getHttpServer())
      .post('/login')
      .send(AUTH_VALID_MOCK)
      .then((data) => {
        expect(data.body.success).toBe(true);
        expect(data.body.message).toBe('Ok');
        expect(data.body.content).toBeDefined();

        JWT_TOKEN = data.body.content;
      });
  });

  it('AuthGuard: should return HttpStatus.MOVED_PERMANENTLY on private route', async () => {
    return supertest(app.getHttpServer())
      .get('/')
      .set('Authorization', 'Bearer ' + JWT_TOKEN)
      .then((data) => {
        expect(data.statusCode).toBe(HttpStatus.MOVED_PERMANENTLY);
        expect(data.body.message).toBeUndefined();
      });
  });
});
