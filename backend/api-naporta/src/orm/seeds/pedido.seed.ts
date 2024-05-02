import _4devs from '@killovsky/4devs';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

async function main() {
  const { code, error, dados } = await _4devs.gerar(95, false, 'pessoa');

  if (code !== 200 || error) return;

  const transaction = prisma.$transaction([
    prisma.pedido.createMany({
      data: dados.map((pessoa) => ({
        numeroPedido: 1,
        dataPrevisaoEntrega: new Date(),
        cliente: {
          nome: pessoa.nome,
          cpf: pessoa.cpf,
          rg: pessoa.rg,
          dataNasc: moment(pessoa.data_nasc, 'DD/MM/YYYY').toDate(),
          celular: pessoa.celular,
          email: pessoa.email,
        },
        enderecoEntrega: {
          cep: pessoa.cep,
          logradouro: pessoa.endereco,
          numero: `${pessoa.numero}`,
          complemento: 'Tel Fixo: ' + pessoa.telefone_fixo,
          bairro: pessoa.bairro,
          cidade: pessoa.cidade,
          estado: pessoa.estado,
        },
        items: [
          { descricao: 'Bolacha Bauducco Morango', preco: 1.99 },
          { descricao: 'Bolacha Bauducco Baunilha', preco: 1.99 },
          { descricao: 'Leite UHT Integral Jussara', preco: 4.49 },
          { descricao: 'Água Mineral Lindoya', preco: 2.5 },
        ],
      })),
    }),
  ]);

  await Promise.all([transaction]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
