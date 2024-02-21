import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../../enums/roles.enum';
import { PrismaService } from '../../prisma.service';
import {
    createUserResponseMock,
    prismaMock,
    usersMock,
} from '../../resources/users.mock';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let service: UsersService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service = await module.resolve<UsersService>(UsersService);
        prisma = await module.resolve<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it(`should return an array of users`, async () => {
            const response = await service.findAll();

            expect(response).toEqual(usersMock);
            expect(prisma.cliente.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it(`should return a single user`, async () => {
            const response = await service.findOne(1);

            expect(response).toEqual(usersMock[0]);
            expect(prisma.cliente.findFirst).toHaveBeenCalledTimes(1);
            expect(prisma.cliente.findFirst).toHaveBeenCalledWith({
                where: { id: 1 },
                select: {
                    email: true,
                    name: true,
                    phoneNumber: true,
                    role: true,
                    status: true,
                    createdAt: true,
                },
            });
        });

        it(`should return NotFoundException when no user is found`, async () => {
            jest.spyOn(prisma.cliente, 'findFirst').mockRejectedValue(
                new NotFoundException('user not found')
            );

            await expect(service.findOne(100)).rejects.toEqual(
                new NotFoundException('user not found')
            );

            expect(prisma.cliente.findFirst).toHaveBeenCalledTimes(1);
            expect(prisma.cliente.findFirst).toHaveBeenCalledWith({
                where: { id: 100 },
                select: {
                    email: true,
                    name: true,
                    phoneNumber: true,
                    role: true,
                    status: true,
                    createdAt: true,
                },
            });
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const response = await service.create(usersMock[0]);
            console.log(response);

            expect(response).toStrictEqual(createUserResponseMock);
            expect(prisma.cliente.create).toHaveBeenCalledTimes(1);
        });

        it('should return ConflitException when duplicated email', async () => {
            const user = {
                name: 'Usuário',
                email: 'usuario@teste.com',
                password: '123456',
                role: Role.Admin,
                phoneNumber: '11999999999',
                status: 'active',
            };

            jest.spyOn(prisma.cliente, 'create').mockRejectedValue(
                new ConflictException('duplicated-email')
            );

            await expect(service.create(user)).rejects.toEqual(
                new ConflictException('duplicated-email')
            );

            expect(prisma.cliente.create).toHaveBeenCalledTimes(1);
        });

        it('should return ConflitException when duplicated phone number', async () => {
            const user = {
                name: 'Usuário',
                email: 'usuario@teste.com',
                password: '123456',
                role: Role.Admin,
                phoneNumber: '11999999999',
                status: 'active',
            };

            jest.spyOn(prisma.cliente, 'create').mockRejectedValue(
                new ConflictException('duplicated-phone-number')
            );
            await expect(service.create(user)).rejects.toEqual(
                new ConflictException('duplicated-phone-number')
            );

            expect(prisma.cliente.create).toHaveBeenCalledTimes(1);
        });
    });
});
