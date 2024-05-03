import { PrismaClient } from '@prisma/client';
import { OrderSeed } from 'src/databases/seeds/order.seed';
import { UserSeed } from 'src/databases/seeds/user.seed';

const prisma = new PrismaClient();

(async () => {
  try {
    await Promise.all([UserSeed(prisma), OrderSeed(prisma)]);

    await prisma.$disconnect();
  } catch (e) {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  }
})();
