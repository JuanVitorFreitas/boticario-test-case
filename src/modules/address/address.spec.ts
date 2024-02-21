import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import {
    addressesMock,
    createAddressRequestMock,
    createAddressResponseMock,
    prismaMock,
} from '../../resources/mocks/address.mock';
import { AddressService } from './address.service';

describe('AddressService', () => {
    let service: AddressService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddressService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service = await module.resolve<AddressService>(AddressService);
        prisma = await module.resolve<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it(`should return an array of addresses`, async () => {
            const response = await service.findAll();

            expect(response).toEqual(addressesMock);
            expect(prisma.endereco.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it(`should return a single address`, async () => {
            const response = await service.findOne(1);

            expect(response).toEqual(addressesMock[0]);
            expect(prisma.endereco.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.endereco.findUnique).toHaveBeenCalledWith({
                where: { endereco_id: 1 },
            });
        });

        it(`should return NotFoundException when no address is found`, async () => {
            jest.spyOn(prisma.endereco, 'findUnique').mockRejectedValue(
                new NotFoundException('address not found')
            );

            await expect(service.findOne(100)).rejects.toEqual(
                new NotFoundException('address not found')
            );

            expect(prisma.endereco.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.endereco.findUnique).toHaveBeenCalledWith({
                where: { endereco_id: 100 },
            });
        });
    });

    describe('create', () => {
        it('should create a new address', async () => {
            const response = await service.create(createAddressRequestMock);

            expect(response).toEqual(createAddressResponseMock);
            expect(prisma.endereco.create).toHaveBeenCalledTimes(1);
        });
    });
});
