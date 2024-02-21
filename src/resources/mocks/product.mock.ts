import { CreateProductDto } from '../../modules/product/dto/create-product.dto';

export const createProductResponseMock = {
    produto_id: 2,
    nome_produto: 'Perfume The Blend Eau',
    descricao_produto:
        'O The Blend Eau de Parfum é uma fragrância masculina Amadeirada Especial, que possui óleo essencial em sua composição. O óleo é produzido através da destilação de quatro especiarias quentes e frescas - Cravo, Canela, Pimenta Preta e Noz Moscada in natura - em um alambique de cobre dentro da fábrica de O Boticário.',
    preco_produto: 350,
    qtd_estoque: 20,
    data_cadastro_produto: '2024-02-21T13:14:21.840Z',
    imagem: '',
    categoria_id: 2,
};

export const createProductRequestMock: CreateProductDto = {
    nome_produto: 'Perfume The Blend Eau',
    descricao_produto:
        'O The Blend Eau de Parfum é uma fragrância masculina Amadeirada Especial, que possui óleo essencial em sua composição. O óleo é produzido através da destilação de quatro especiarias quentes e frescas - Cravo, Canela, Pimenta Preta e Noz Moscada in natura - em um alambique de cobre dentro da fábrica de O Boticário.',
    preco_produto: 350,
    qtd_estoque: 20,
    imagem: '',
    categoria_id: 2,
};

export const productsMock = [
    {
        produto_id: 2,
        nome_produto: 'Perfume The Blend Eau',
        descricao_produto:
            'O The Blend Eau de Parfum é uma fragrância masculina Amadeirada Especial, que possui óleo essencial em sua composição. O óleo é produzido através da destilação de quatro especiarias quentes e frescas - Cravo, Canela, Pimenta Preta e Noz Moscada in natura - em um alambique de cobre dentro da fábrica de O Boticário.',
        preco_produto: 350,
        qtd_estoque: 50,
        data_cadastro_produto: '2024-02-21T13:14:21.840Z',
        imagem: '',
        categoria_id: 2,
    },
];

export const prismaMock = {
    produto: {
        create: jest.fn().mockReturnValue(createProductResponseMock),
        findMany: jest.fn().mockResolvedValue(productsMock),
        findUnique: jest.fn().mockResolvedValue(productsMock[0]),
        findFirst: jest.fn().mockResolvedValue(productsMock[0]),
        update: jest.fn().mockResolvedValue(productsMock[0]),
        delete: jest.fn(),
    },
};
