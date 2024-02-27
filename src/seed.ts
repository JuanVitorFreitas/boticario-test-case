import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const product = await prisma.produto.create({
        data: {
            nome_produto: 'Perfume The Blend Eau',
            descricao_produto:
                'O The Blend Eau de Parfum é uma fragrância masculina Amadeirada Especial, que possui óleo essencial em sua composição. O óleo é produzido através da destilação de quatro especiarias quentes e frescas - Cravo, Canela, Pimenta Preta e Noz Moscada in natura - em um alambique de cobre dentro da fábrica de O Boticário.',
            preco_produto: 350,
            qtd_estoque: 20,
            imagem: '',
            categoria: {
                create: {
                    nome_categoria: 'Perfumes',
                    descricao_categoria: 'Perfumes masculinos e femininos',
                },
            },
        },
    });

    await prisma.cliente.create({
        data: {
            email: 'teste@teste.com',
            username: 'teste',
            senha: '$2a$10$Q9nE/MyqlZHQBdBwgZvfk.xDjIdK4rFEp.jbLdez/7gB5EFxPp3y2',
            cpf: '55555555555',
            nome: 'Teste',
            telefone: '99999999999',
            data_nascimento: '2012-02-20T12:38:44.881Z',
            endereco: {
                create: {
                    bairro: 'Test',
                    cep: '11111111',
                    cidade: 'São Paulo',
                    numero: '123A',
                    complemento: '',
                    rua: 'loram',
                    uf: 'SP',
                },
            },
            pedido: {
                create: {
                    numero_pedido: 1,
                    valor_total_pedido: 1500,
                    status: true,
                    produtoPedido: {
                        create: {
                            produto_id: product.produto_id,
                            preco_produto_pedido: 1500,
                            qtd_produto_pedido: 20,
                        },
                    },
                },
            },
        },
    });
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
