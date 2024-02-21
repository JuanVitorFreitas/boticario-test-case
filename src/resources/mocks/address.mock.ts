import { CreateAddressDto } from '../../modules/address/dto/create-address.dto';

export const createAddressResponseMock = {
    endereco_id: 1,
    cep: '11111111',
    rua: 'lorem',
    bairro: 'test',
    cidade: 'São Paulo',
    numero: '123',
    complemento: '',
    uf: 'SP',
    cliente_id: 13,
};

export const createAddressRequestMock: CreateAddressDto = {
    cep: '11111111',
    rua: 'lorem',
    bairro: 'test',
    cidade: 'São Paulo',
    complemento: '',
    numero: '123',
    uf: 'SP',
    cliente_id: 13,
};

export const addressesMock = [
    {
        endereco_id: 1,
        cep: '11111111',
        rua: 'lorem',
        bairro: 'test',
        cidade: 'São Paulo',
        numero: '123',
        complemento: '',
        uf: 'SP',
        cliente_id: 13,
    },
];

export const prismaMock = {
    endereco: {
        create: jest.fn().mockReturnValue(createAddressResponseMock),
        findMany: jest.fn().mockResolvedValue(addressesMock),
        findUnique: jest.fn().mockResolvedValue(addressesMock[0]),
        findFirst: jest.fn().mockResolvedValue(addressesMock[0]),
        update: jest.fn().mockResolvedValue(addressesMock[0]),
        delete: jest.fn(),
    },
};
