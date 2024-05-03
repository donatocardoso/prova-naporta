import _4devs from '@killovsky/4devs';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

export async function OrderSeed(prisma: PrismaClient): Promise<any> {
  const { code, error, dados } = await _4devs.gerar(95, false, 'pessoa');

  if (code !== 200 || error) return;

  return prisma.$transaction([
    prisma.order.createMany({
      data: dados.map((person) => ({
        orderNumber: 1,
        expectedDeliveryDate: new Date(),
        customer: {
          name: person.nome,
          cpf: person.cpf,
          rg: person.rg,
          birthDate: moment(person.data_nasc, 'DD/MM/YYYY').toDate(),
          cellphone: person.celular,
          email: person.email,
        },
        deliveryAddress: {
          zipcode: person.cep,
          address: person.endereco,
          number: `${person.numero}`,
          complement: 'Tel Fixo: ' + person.telefone_fixo,
          neighborhood: person.bairro,
          city: person.cidade,
          district: person.estado,
        },
        items: [
          { description: 'Bolacha Bauducco Morango', prize: 1.99 },
          { description: 'Bolacha Bauducco Baunilha', prize: 1.99 },
          { description: 'Leite UHT Integral Jussara', prize: 4.49 },
          { description: 'Água Mineral Lindoya', prize: 2.5 },
        ],
      })),
    }),
  ]);
}
