import { PrismaClient } from '@prisma/client';

export async function UserSeed(prisma: PrismaClient): Promise<any> {
  return prisma.$transaction([
    prisma.user.createMany({
      data: [
        {
          name: 'Donato Cardoso',
          description: 'DEV Full Stack',
          login: 'dev_donato',
          password: '0Fsd0Ynq2Z',
        },
        {
          name: 'Felipe Cardoso',
          description: 'DEV Full Stack',
          login: 'dev_felipe',
          password: '6wyXgGcb5T',
        },
      ],
    }),
  ]);
}
