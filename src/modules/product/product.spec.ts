import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import {
    createProductRequestMock,
    createProductResponseMock,
    prismaMock,
    productsMock,
} from '../../resources/mocks/product.mock';
import { ProductService } from './product.service';

describe('ProductService', () => {
    let service: ProductService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service = await module.resolve<ProductService>(ProductService);
        prisma = await module.resolve<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it(`should return an array of products`, async () => {
            const response = await service.findAll();

            expect(response).toEqual(productsMock);
            expect(prisma.produto.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it(`should return a single product`, async () => {
            const response = await service.findOne(1);

            expect(response).toEqual(productsMock[0]);
            expect(prisma.produto.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.produto.findUnique).toHaveBeenCalledWith({
                where: { produto_id: 1 },
            });
        });

        it(`should return NotFoundException when no product is found`, async () => {
            jest.spyOn(prisma.produto, 'findUnique').mockRejectedValue(
                new NotFoundException('product not found')
            );

            await expect(service.findOne(100)).rejects.toEqual(
                new NotFoundException('product not found')
            );

            expect(prisma.produto.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.produto.findUnique).toHaveBeenCalledWith({
                where: { produto_id: 100 },
            });
        });
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const response = await service.create(createProductRequestMock);

            expect(response).toEqual(createProductResponseMock);
            expect(prisma.produto.create).toHaveBeenCalledTimes(1);
        });
    });
});
