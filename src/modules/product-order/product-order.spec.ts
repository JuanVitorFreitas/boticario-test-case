import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import {
    ProductOrdersMock,
    createProductOrderRequestMock,
    createProductOrderResponseMock,
    prismaMock,
} from '../../resources/mocks/product-order.mock';
import { ProductOrderService } from './product-order.service';

describe('ProductOrderService', () => {
    let service: ProductOrderService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductOrderService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service =
            await module.resolve<ProductOrderService>(ProductOrderService);
        prisma = await module.resolve<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it(`should return an array of product orders`, async () => {
            const response = await service.findAll();

            expect(response).toEqual(ProductOrdersMock);
            expect(prisma.produtoPedido.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it(`should return a single product order`, async () => {
            const response = await service.findOne(1);

            expect(response).toEqual(ProductOrdersMock[0]);
            expect(prisma.produtoPedido.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.produtoPedido.findUnique).toHaveBeenCalledWith({
                where: { produto_pedido_id: 1 },
            });
        });

        it(`should return NotFoundException when no product order is found`, async () => {
            jest.spyOn(prisma.produtoPedido, 'findUnique').mockRejectedValue(
                new NotFoundException('product order not found')
            );

            await expect(service.findOne(100)).rejects.toEqual(
                new NotFoundException('product order not found')
            );

            expect(prisma.produtoPedido.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.produtoPedido.findUnique).toHaveBeenCalledWith({
                where: { produto_pedido_id: 100 },
            });
        });
    });

    describe('create', () => {
        it('should create a new product order', async () => {
            const response = await service.create(
                createProductOrderRequestMock
            );

            expect(response).toEqual(createProductOrderResponseMock);
            expect(prisma.produtoPedido.create).toHaveBeenCalledTimes(1);
        });
    });
});
