import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HomeController } from 'src/controllers/home.controller';
import { OrderModule } from 'src/modules/order.module';
import { PrismaModule } from 'src/modules/prisma.module';
import { UserModule } from 'src/modules/user.module';
import { HomeService } from 'src/services/home.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    OrderModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [HomeController],
  providers: [JwtService, HomeService, UserService],
})
export class HomeModule {}
