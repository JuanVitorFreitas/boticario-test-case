import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: 'teste@teste.com',
            password:
                '$2a$10$TYLWGxA6wUQLgHbxEaUSveJZJ9hzdtc6YcVMj/3uzirSUr5u3dQM.',
            name: 'Teste',
            phoneNumber: '99999999999',
            role: 'admin',
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
