import { CreateProductOrderDto } from '../../modules/product-order/dto/create-product-order.dto';

export const createProductOrderResponseMock = {
    produto_pedido_id: 2,
    qtd_produto_pedido: 5,
    preco_produto_pedido: 500,
    produto_id: 2,
    pedido_id: 2,
};

export const createProductOrderRequestMock: CreateProductOrderDto = {
    qtd_produto_pedido: 5,
    preco_produto_pedido: 500,
    produto_id: 2,
    pedido_id: 2,
};

export const ProductOrdersMock = [
    {
        produto_pedido_id: 1,
        qtd_produto_pedido: 5,
        preco_produto_pedido: 500,
        produto_id: 2,
        pedido_id: 2,
    },
];

export const prismaMock = {
    produtoPedido: {
        create: jest.fn().mockReturnValue(createProductOrderResponseMock),
        findMany: jest.fn().mockResolvedValue(ProductOrdersMock),
        findUnique: jest.fn().mockResolvedValue(ProductOrdersMock[0]),
        findFirst: jest.fn().mockResolvedValue(ProductOrdersMock[0]),
        update: jest.fn().mockResolvedValue(ProductOrdersMock[0]),
        delete: jest.fn(),
    },
};
