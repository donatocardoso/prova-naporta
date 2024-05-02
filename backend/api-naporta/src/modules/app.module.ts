import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from 'src/controllers/app.controller';
import { OrderModule } from 'src/modules/order.module';
import { PrismaModule } from 'src/modules/prisma.module';
import { UserModule } from 'src/modules/user.module';
import { AppService } from 'src/services/app.service';
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
  controllers: [AppController],
  providers: [JwtService, AppService, UserService],
})
export class AppModule {}
