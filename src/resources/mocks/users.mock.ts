import { CreateUserDto } from '../../modules/users/dto/create-user.dto';

export const createUserResponseMock = {
    email: 'teste@teste.com',
    username: 'teste',
    nome: 'Teste',
    cpf: '55555555556',
    telefone: '99999999999',
    data_nascimento: new Date('2012-02-20T12:38:44.881Z'),
    createdAt: new Date('2024-02-21T17:11:46.810Z'),
    updatedAt: new Date('2024-02-21T17:11:46.810Z'),
    cliente_id: 20,
};

export const createUserRequestMock: CreateUserDto = {
    email: 'teste@teste.com',
    username: 'teste',
    senha: '123456',
    cpf: '55555555556',
    nome: 'Teste',
    telefone: '99999999999',
    data_nascimento: new Date('2012-02-20T12:38:44.881Z'),
};

export const usersMock = [
    {
        email: 'teste@teste.com',
        nome: 'Teste',
        telefone: '99999999999',
        username: 'teste',
        cpf: '55555555555',
        createdAt: '2024-02-20T12:29:23.734Z',
        updatedAt: '2024-02-20T12:29:23.734Z',
        data_nascimento: new Date('2011-10-10T05:48:00.000Z'),
        cliente_id: 13,
    },
    {
        email: 'teste@teste.com',
        nome: 'Teste',
        telefone: '99999999999',
        username: 'teste',
        cpf: '55555555552',
        createdAt: '2024-02-20T12:38:44.881Z',
        updatedAt: '2024-02-20T12:38:44.881Z',
        data_nascimento: new Date('2011-10-10T05:48:00.000Z'),
        cliente_id: 16,
    },
    {
        email: 'teste@teste.com',
        nome: 'Teste',
        telefone: '99999999999',
        username: 'teste',
        cpf: '55555555553',
        createdAt: '2024-02-20T12:39:23.363Z',
        updatedAt: '2024-02-20T12:39:23.363Z',
        data_nascimento: new Date('2024-02-20T12:38:44.881Z'),
        cliente_id: 17,
    },
    {
        email: 'teste@teste.com',
        nome: 'Teste',
        telefone: '99999999999',
        username: 'teste',
        cpf: '55555555554',
        createdAt: '2024-02-20T12:41:00.198Z',
        updatedAt: '2024-02-20T12:46:36.645Z',
        data_nascimento: new Date('2012-02-20T12:38:44.881Z'),
        cliente_id: 18,
    },
    {
        email: 'teste@teste.com',
        nome: 'Teste',
        telefone: '99999999999',
        username: 'teste',
        cpf: '55555555556',
        createdAt: '2024-02-21T17:11:46.810Z',
        updatedAt: '2024-02-21T17:11:46.810Z',
        data_nascimento: new Date('2012-02-20T12:38:44.881Z'),
        cliente_id: 20,
    },
];

export const prismaMock = {
    cliente: {
        create: jest.fn().mockReturnValue(createUserResponseMock),
        findMany: jest.fn().mockResolvedValue(usersMock),
        findUnique: jest.fn().mockResolvedValue(usersMock[0]),
        findFirst: jest.fn().mockResolvedValue(usersMock[0]),
        update: jest.fn().mockResolvedValue(usersMock[0]),
        delete: jest.fn(),
    },
};
