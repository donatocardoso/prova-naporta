import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/configs/jwt-auth.guard';
import { HomeModule } from 'src/modules/home.module';

async function bootstrap() {
  // cria instancia do servidor
  const app = await NestFactory.create(HomeModule);

  // adiciona o swagger para visualizacao de rotas
  const config = new DocumentBuilder().setTitle('api-naporta').setDescription('').setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-naporta', app, document, {
    swaggerOptions: {
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
        },
      },
    },
  });

  // adiciona segurança a api
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);

  app.useGlobalGuards(new JwtAuthGuard(reflector, jwtService));

  // inicia o servidor
  await app.listen(3000);
}

bootstrap();
