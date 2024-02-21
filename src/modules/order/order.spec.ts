import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import {
    createOrderRequestMock,
    createOrderResponseMock,
    ordersMock,
    prismaMock,
} from '../../resources/mocks/order.mock';
import { OrdersService } from './orders.service';

describe('OrderService', () => {
    let service: OrdersService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service = await module.resolve<OrdersService>(OrdersService);
        prisma = await module.resolve<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it(`should return an array of orders`, async () => {
            const response = await service.findAll();

            expect(response).toEqual(ordersMock);
            expect(prisma.pedido.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it(`should return a single order`, async () => {
            const response = await service.findOne(1);

            expect(response).toEqual(ordersMock[0]);
            expect(prisma.pedido.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.pedido.findUnique).toHaveBeenCalledWith({
                where: { pedido_id: 1 },
            });
        });

        it(`should return NotFoundException when no order is found`, async () => {
            jest.spyOn(prisma.pedido, 'findUnique').mockRejectedValue(
                new NotFoundException('order not found')
            );

            await expect(service.findOne(100)).rejects.toEqual(
                new NotFoundException('order not found')
            );

            expect(prisma.pedido.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.pedido.findUnique).toHaveBeenCalledWith({
                where: { pedido_id: 100 },
            });
        });
    });

    describe('create', () => {
        it('should create a new order', async () => {
            const response = await service.create(createOrderRequestMock);

            expect(response).toEqual(createOrderResponseMock);
            expect(prisma.pedido.create).toHaveBeenCalledTimes(1);
        });
    });
});
