import { CreateOrderDto } from '../../modules/order/dto/create-order.dto';

export const createOrderResponseMock = {
    pedido_id: 5,
    numero_pedido: 1,
    valor_total_pedido: 1500,
    data_pedido: '2024-02-21T18:23:13.394Z',
    status: true,
    cliente_id: 13,
};

export const createOrderRequestMock: CreateOrderDto = {
    numero_pedido: 1,
    valor_total_pedido: 1500,
    status: true,
    cliente_id: 13,
};

export const ordersMock = [
    {
        pedido_id: 2,
        numero_pedido: 1,
        valor_total_pedido: 3000,
        data_pedido: '2024-02-21T11:26:46.856Z',
        status: true,
        cliente_id: 13,
    },
    {
        pedido_id: 3,
        numero_pedido: 1,
        valor_total_pedido: 1500,
        data_pedido: '2024-02-21T13:18:03.293Z',
        status: true,
        cliente_id: 13,
    },
    {
        pedido_id: 4,
        numero_pedido: 1,
        valor_total_pedido: 1500,
        data_pedido: '2024-02-21T18:23:11.994Z',
        status: true,
        cliente_id: 13,
    },
    {
        pedido_id: 5,
        numero_pedido: 1,
        valor_total_pedido: 1500,
        data_pedido: '2024-02-21T18:23:13.394Z',
        status: true,
        cliente_id: 13,
    },
];

export const prismaMock = {
    pedido: {
        create: jest.fn().mockReturnValue(createOrderResponseMock),
        findMany: jest.fn().mockResolvedValue(ordersMock),
        findUnique: jest.fn().mockResolvedValue(ordersMock[0]),
        findFirst: jest.fn().mockResolvedValue(ordersMock[0]),
        update: jest.fn().mockResolvedValue(ordersMock[0]),
        delete: jest.fn(),
    },
};
