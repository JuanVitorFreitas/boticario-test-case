import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../../prisma.service';
import {
    createUserRequestMock,
    createUserResponseMock,
    prismaMock,
    usersMock,
} from '../../resources/mocks/users.mock';
import { UserDto } from './dto/create-user.dto';
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
                where: { cliente_id: 1 },
                select: {
                    email: true,
                    nome: true,
                    telefone: true,
                    data_nascimento: true,
                    createdAt: true,
                    username: true,
                    updatedAt: true,
                    cpf: true,
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
                where: { cliente_id: 100 },
                select: {
                    email: true,
                    nome: true,
                    telefone: true,
                    data_nascimento: true,
                    createdAt: true,
                    username: true,
                    updatedAt: true,
                    cpf: true,
                },
            });
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const response = await service.create(createUserRequestMock);

            const userResponse = plainToClass(UserDto, response);

            expect(userResponse).toEqual(createUserResponseMock);
            expect(prisma.cliente.create).toHaveBeenCalledTimes(1);
        });

        it('should return ConflitException when duplicated cpf', async () => {
            const user = {
                email: 'teste@teste.com',
                username: 'teste',
                senha: '123456',
                cpf: '55555555556',
                nome: 'Teste',
                telefone: '99999999999',
                data_nascimento: new Date('2012-02-20T12:38:44.881Z'),
            };

            jest.spyOn(prisma.cliente, 'create').mockRejectedValue(
                new ConflictException('duplicated-cpf')
            );

            await expect(service.create(user)).rejects.toEqual(
                new ConflictException('duplicated-cpf')
            );

            expect(prisma.cliente.create).toHaveBeenCalledTimes(1);
        });

        it('should return ConflitException when duplicated phone number', async () => {
            const user = {
                email: 'teste@teste.com',
                username: 'teste',
                senha: '123456',
                cpf: '55555555556',
                nome: 'Teste',
                telefone: '99999999999',
                data_nascimento: new Date('2012-02-20T12:38:44.881Z'),
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
