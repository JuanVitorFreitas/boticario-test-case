import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import {
    categoriesMock,
    createCategoryRequestMock,
    createCategoryResponseMock,
    prismaMock,
} from '../../resources/mocks/category.mock';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
    let service: CategoryService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service = await module.resolve<CategoryService>(CategoryService);
        prisma = await module.resolve<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it(`should return an array of categories`, async () => {
            const response = await service.findAll();

            expect(response).toEqual(categoriesMock);
            expect(prisma.categoria.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it(`should return a single category`, async () => {
            const response = await service.findOne(1);

            expect(response).toEqual(categoriesMock[0]);
            expect(prisma.categoria.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.categoria.findUnique).toHaveBeenCalledWith({
                where: { categoria_id: 1 },
            });
        });

        it(`should return NotFoundException when no category is found`, async () => {
            jest.spyOn(prisma.categoria, 'findUnique').mockRejectedValue(
                new NotFoundException('category not found')
            );

            await expect(service.findOne(100)).rejects.toEqual(
                new NotFoundException('category not found')
            );

            expect(prisma.categoria.findUnique).toHaveBeenCalledTimes(1);
            expect(prisma.categoria.findUnique).toHaveBeenCalledWith({
                where: { categoria_id: 100 },
            });
        });
    });

    describe('create', () => {
        it('should create a new category', async () => {
            const response = await service.create(createCategoryRequestMock);

            expect(response).toEqual(createCategoryResponseMock);
            expect(prisma.categoria.create).toHaveBeenCalledTimes(1);
        });
    });
});
