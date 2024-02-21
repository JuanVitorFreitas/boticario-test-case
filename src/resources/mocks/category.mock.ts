import { CreateCategoryDto } from '../../modules/category/dto/create-category.dto';

export const createCategoryResponseMock = {
    categoria_id: 2,
    nome_categoria: 'Perfumes',
    descricao_categoria: 'Perfumes masculinos e femininos',
};

export const createCategoryRequestMock: CreateCategoryDto = {
    nome_categoria: 'Perfumes',
    descricao_categoria: 'Perfumes masculinos e femininos',
};

export const categoriesMock = [
    {
        categoria_id: 2,
        nome_categoria: 'Perfumes',
        descricao_categoria: 'Perfumes masculinos e femininos',
    },
];

export const prismaMock = {
    categoria: {
        create: jest.fn().mockReturnValue(createCategoryResponseMock),
        findMany: jest.fn().mockResolvedValue(categoriesMock),
        findUnique: jest.fn().mockResolvedValue(categoriesMock[0]),
        findFirst: jest.fn().mockResolvedValue(categoriesMock[0]),
        update: jest.fn().mockResolvedValue(categoriesMock[0]),
        delete: jest.fn(),
    },
};
