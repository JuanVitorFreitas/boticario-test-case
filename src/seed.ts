import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.cliente.createMany({
        data: [
            {
                email: 'teste@teste.com',
                username: 'teste',
                senha: '$2a$10$TYLWGxA6wUQLgHbxEaUSveJZJ9hzdtc6YcVMj/3uzirSUr5u3dQM.',
                cpf: '55555555555',
                nome: 'Teste',
                telefone: '99999999999',
                data_nascimento: '2024-02-20T12:38:44.881Z',
            },
            {
                email: 'teste@teste.com',
                username: 'teste',
                cpf: '55555555551',
                nome: 'Teste',
                telefone: '99999999999',
                data_nascimento: '2024-02-20T12:38:44.881Z',
            },
        ],
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
