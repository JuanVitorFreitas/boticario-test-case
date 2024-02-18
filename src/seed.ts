import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: 'juanvitor2001@outlook.com',
            password: '123456',
            name: 'Juan',
            phoneNumber: '13981154318',
            role: 'admin',
        }
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
